"use client";

import type { SocialLinks } from "@/types/bsv20";
import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import SocialLinksInput from "./SocialLinksInput";
import SocialLinksComponent from "./index";

interface SocialLinksManagerProps {
  tokenId: string;
  tokenSymbol: string;
  currentSocialLinks?: SocialLinks;
  isCreator: boolean;
  onUpdate?: (socialLinks: SocialLinks) => void;
}

const SocialLinksManager: React.FC<SocialLinksManagerProps> = ({
  tokenId,
  tokenSymbol,
  currentSocialLinks = {},
  isCreator,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(currentSocialLinks);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tokens/social-links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId,
          socialLinks,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update social links');
      }

      const result = await response.json();

      if (result.success) {
        toast.success('Social links updated successfully!');
        setIsEditing(false);
        onUpdate?.(socialLinks);
      } else {
        throw new Error(result.error || 'Failed to update social links');
      }
    } catch (error) {
      console.error('Error updating social links:', error);
      toast.error('Failed to update social links. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSocialLinks(currentSocialLinks);
    setIsEditing(false);
  };

  if (!isCreator) {
    return (
      <div className="flex items-center gap-2">
        <SocialLinksComponent socialLinks={currentSocialLinks} size="md" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Social Links for {tokenSymbol}</span>
          {!isEditing && (
            <SocialLinksComponent socialLinks={currentSocialLinks} size="sm" />
          )}
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-outline flex items-center gap-2"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="btn btn-sm btn-primary flex items-center gap-2"
            >
              <FaSave className="w-3 h-3" />
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="btn btn-sm btn-ghost flex items-center gap-2"
            >
              <FaTimes className="w-3 h-3" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="bg-base-200 p-4 rounded-lg">
          <SocialLinksInput
            socialLinks={socialLinks}
            onChange={setSocialLinks}
            showOptional={true}
          />
        </div>
      )}
    </div>
  );
};

export default SocialLinksManager;
