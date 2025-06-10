import { HandCashConnect } from '@handcash/handcash-connect';

// HandCash Connect configuration - these should be server-side environment variables
const HANDCASH_APP_ID = process.env.HANDCASH_APP_ID || '664f4b4e69c4f700088cf11c';
const HANDCASH_APP_SECRET = process.env.HANDCASH_APP_SECRET || '';

let handCashConnect: HandCashConnect | null = null;

export const initializeHandCash = () => {
  if (!handCashConnect) {
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

  return hcConnect.getRedirectionUrl(customParams);
};

export const signMessage = async (authToken: string, message: string) => {
  const account = await getHandCashAccount(authToken);
  return account.wallet.sign({ text: message });
};

export const getWalletAddress = async (authToken: string) => {
  const account = await getHandCashAccount(authToken);
  const address = await account.wallet.getReceiveAddress();
  return address;
};

export const getUserProfile = async (authToken: string) => {
  const account = await getHandCashAccount(authToken);
  return account.profile.getCurrentProfile();
};

export const getSpendableBalance = async (authToken: string) => {
  const account = await getHandCashAccount(authToken);
  return account.wallet.getSpendableBalance();
};
