import { HandCashConnect } from '@handcash/handcash-connect';

// HandCash Connect configuration - these MUST be set in environment variables
const HANDCASH_APP_ID = process.env.HANDCASH_APP_ID;
const HANDCASH_APP_SECRET = process.env.HANDCASH_APP_SECRET;

let handCashConnect: HandCashConnect | null = null;

export const initializeHandCash = () => {
  if (!HANDCASH_APP_ID || !HANDCASH_APP_SECRET) {
    console.error('HandCash configuration missing:', {
      hasAppId: !!HANDCASH_APP_ID,
      hasAppSecret: !!HANDCASH_APP_SECRET,
      nodeEnv: process.env.NODE_ENV
    });
    throw new Error('HandCash credentials not configured. Please set HANDCASH_APP_ID and HANDCASH_APP_SECRET environment variables.');
  }

  if (!handCashConnect) {
    console.log('Initializing HandCash Connect with APP_ID:', HANDCASH_APP_ID);
    handCashConnect = new HandCashConnect({
      appId: HANDCASH_APP_ID,
      appSecret: HANDCASH_APP_SECRET,
    });
  }

  return handCashConnect;
};

export const getHandCashAccount = async (authToken: string) => {
  const hcConnect = initializeHandCash();
  if (!hcConnect) throw new Error('HandCash not initialized');

  return hcConnect.getAccountFromAuthToken(authToken);
};

export const getHandCashRedirectUrl = (customParams?: Record<string, string>) => {
  const hcConnect = initializeHandCash();
  if (!hcConnect) throw new Error('HandCash not initialized');

  const redirectUrl = hcConnect.getRedirectionUrl(customParams);
  console.log('Generated HandCash redirect URL:', redirectUrl);
  return redirectUrl;
};

export const getUserProfile = async (authToken: string) => {
  const account = await getHandCashAccount(authToken);
  return account.profile.getCurrentProfile();
};

export const getSpendableBalance = async (authToken: string) => {
  const account = await getHandCashAccount(authToken);
  return account.wallet.getSpendableBalance();
};

export const makePayment = async (authToken: string, payments: Array<{destination: string, sendAmount: number, currencyCode: 'USD' | 'BSV' | 'SAT'}>, description?: string) => {
  const account = await getHandCashAccount(authToken);
  return account.wallet.pay({
    payments,
    description: description || 'Payment via 1Sat Ordinals'
  });
};
