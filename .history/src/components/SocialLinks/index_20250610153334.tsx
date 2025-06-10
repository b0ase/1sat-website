"use client";

import { FaGlobe, FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';
import type { SocialLinks } from '@/types/bsv20';

interface SocialLinksProps {
  socialLinks?: SocialLinks;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SocialLinksComponent({ socialLinks, className = '', size = 'md' }: SocialLinksProps) {
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null;
  }

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const linkClass = `btn btn-ghost btn-xs ${iconSize} p-1 min-h-0 h-auto`;

  return (
    <div className={`flex gap-1 items-center ${className}`}>
      {socialLinks.website && (
        <a
          href={socialLinks.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-blue-500 hover:text-blue-600`}
          title="Website"
        >
          <FaGlobe className={iconSize} />
        </a>
      )}
      {socialLinks.twitter && (
        <a
          href={socialLinks.twitter.startsWith('http') ? socialLinks.twitter : `https://twitter.com/${socialLinks.twitter.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-blue-400 hover:text-blue-500`}
          title="Twitter"
        >
          <FaTwitter className={iconSize} />
        </a>
      )}
      {socialLinks.telegram && (
        <a
          href={socialLinks.telegram.startsWith('http') ? socialLinks.telegram : `https://t.me/${socialLinks.telegram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-blue-300 hover:text-blue-400`}
          title="Telegram"
        >
          <FaTelegram className={iconSize} />
        </a>
      )}
      {socialLinks.discord && (
        <a
          href={socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-indigo-400 hover:text-indigo-500`}
          title="Discord"
        >
          <FaDiscord className={iconSize} />
        </a>
      )}
    </div>
  );
}
