"use client";

import { HandCashConnect } from 'handcash-connect';

// HandCash Connect configuration
const HANDCASH_APP_ID = process.env.NEXT_PUBLIC_HANDCASH_APP_ID || '664f4b4e69c4f700088cf11c';
const HANDCASH_APP_SECRET = process.env.NEXT_PUBLIC_HANDCASH_APP_SECRET || '';

let handCashConnect: HandCashConnect | null = null;

export const initializeHandCash = () => {
  if (typeof window === 'undefined') return null;

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

export const getHandCashRedirectUrl = () => {
  const hcConnect = initializeHandCash();
  if (!hcConnect) throw new Error('HandCash not initialized');

  const redirectUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/handcash/callback`
    : 'http://localhost:3000/auth/handcash/callback';

  return hcConnect.getRedirectionUrl(redirectUrl);
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
