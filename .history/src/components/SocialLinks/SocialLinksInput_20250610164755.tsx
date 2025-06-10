"use client";

import type { SocialLinks } from "@/types/bsv20";
import { useState } from "react";
import { FaTwitter, FaTelegram, FaDiscord, FaGlobe } from "react-icons/fa";

interface SocialLinksInputProps {
  socialLinks?: SocialLinks;
  onChange: (socialLinks: SocialLinks) => void;
  showOptional?: boolean;
}

const SocialLinksInput: React.FC<SocialLinksInputProps> = ({
  socialLinks = {},
  onChange,
  showOptional = false,
}) => {
  const [links, setLinks] = useState<SocialLinks>(socialLinks);

  const handleChange = (platform: keyof SocialLinks, value: string) => {
    const newLinks = { ...links, [platform]: value };
    setLinks(newLinks);
    onChange(newLinks);
  };

  const validateUrl = (url: string, platform: string): boolean => {
    if (!url) return true; // Empty is valid
    try {
      const urlObj = new URL(url);
      switch (platform) {
        case 'twitter':
          return urlObj.hostname === 'twitter.com' || urlObj.hostname === 'x.com';
        case 'telegram':
          return urlObj.hostname === 't.me';
        case 'discord':
          return urlObj.hostname === 'discord.gg' || urlObj.hostname === 'discord.com';
        case 'website':
          return true; // Any valid URL is fine for website
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const getPlaceholder = (platform: string): string => {
    switch (platform) {
      case 'website':
        return 'https://yourtoken.com';
      case 'twitter':
        return 'https://twitter.com/yourtoken';
      case 'telegram':
        return 'https://t.me/yourtoken';
      case 'discord':
        return 'https://discord.gg/yourtoken';
      default:
        return '';
    }
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'website':
        return <FaGlobe className="text-blue-500" />;
      case 'twitter':
        return <FaTwitter className="text-blue-400" />;
      case 'telegram':
        return <FaTelegram className="text-blue-600" />;
      case 'discord':
        return <FaDiscord className="text-indigo-500" />;
      default:
        return null;
    }
  };

  const platforms = showOptional
    ? ['website', 'twitter', 'telegram', 'discord']
    : ['website', 'twitter'];

  return (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center gap-2">
        <FaGlobe className="text-blue-500" />
        Social Links
        <span className="text-[#555] text-sm font-normal">Optional</span>
      </div>

      {platforms.map((platform) => (
        <div key={platform} className="space-y-2">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              {getIcon(platform)}
              <span className="text-sm capitalize">{platform === 'website' ? 'Website' : platform}</span>
              {!validateUrl(links[platform as keyof SocialLinks] || '', platform) &&
               links[platform as keyof SocialLinks] && (
                <span className="text-red-400 text-xs">Invalid URL format</span>
              )}
            </div>
            <input
              type="url"
              className={`text-white w-full rounded p-2 border ${
                !validateUrl(links[platform as keyof SocialLinks] || '', platform) &&
                links[platform as keyof SocialLinks]
                  ? 'border-red-400 bg-red-900/20'
                  : 'border-gray-600 bg-gray-800'
              }`}
              placeholder={getPlaceholder(platform)}
              value={links[platform as keyof SocialLinks] || ''}
              onChange={(e) => handleChange(platform as keyof SocialLinks, e.target.value)}
            />
          </label>
        </div>
      ))}

      {!showOptional && (
        <button
          type="button"
          className="text-blue-500 hover:text-blue-400 text-sm transition"
          onClick={() => {
            // This would need to be passed as a prop or managed by parent
          }}
        >
          + Add more social links
        </button>
      )}
    </div>
  );
};

export default SocialLinksInput;
