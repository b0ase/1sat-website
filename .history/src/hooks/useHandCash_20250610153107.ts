"use client";

import { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';

interface HandCashUser {
  handle: string;
  displayName: string;
  avatarUrl: string;
}

export function useHandCash() {
  const [user, setUser] = useState<HandCashUser | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for HandCash user in cookies
    const userCookie = getCookie('handcash_user');

    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie as string);
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
