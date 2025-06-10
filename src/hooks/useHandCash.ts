"use client";

import { useState, useEffect } from 'react';

interface HandCashUser {
  handle: string;
  displayName: string;
  avatarUrl: string;
}

// Helper functions for cookie management
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function useHandCash() {
  const [user, setUser] = useState<HandCashUser | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for HandCash user in cookies
    const userCookie = getCookie('handcash_user');

    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUser(userData);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to parse HandCash user data:', error);
        // Clear invalid cookie
        deleteCookie('handcash_user');
        deleteCookie('handcash_auth_token');
      }
    }

    setIsLoading(false);
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/handcash/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        setIsConnected(false);
        deleteCookie('handcash_user');
        deleteCookie('handcash_auth_token');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isConnected,
    isLoading,
    logout,
  };
}
