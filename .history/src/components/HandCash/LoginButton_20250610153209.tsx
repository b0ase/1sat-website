"use client";

import { useState } from 'react';
import { FaWallet } from 'react-icons/fa6';
import toast from 'react-hot-toast';

interface HandCashLoginButtonProps {
  onSuccess?: () => void;
  className?: string;
}

export default function HandCashLoginButton({ onSuccess, className = '' }: HandCashLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      // Get the redirect URL from our API
      const response = await fetch('/api/auth/handcash/login');
      const data = await response.json();

      if (data.success && data.redirectUrl) {
        // Redirect to HandCash for authentication
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('Failed to get login URL');
      }
    } catch (error) {
      console.error('HandCash login error:', error);
      toast.error('Failed to connect to HandCash');
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      className={`btn btn-primary ${className} ${isLoading ? 'loading' : ''}`}
    >
      {!isLoading && <FaWallet className="w-4 h-4 mr-2" />}
      {isLoading ? 'Connecting...' : 'Connect HandCash'}
    </button>
  );
}
