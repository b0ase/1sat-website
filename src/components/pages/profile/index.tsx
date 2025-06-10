"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaWallet, FaCog, FaExternalLinkAlt } from "react-icons/fa";
import { HiSparkles, HiCollection } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import { useHandCash } from "@/hooks/useHandCash";

interface ProfileData {
  handle: string;
  displayName: string;
  avatarUrl: string;
  isOwner?: boolean;
}

interface UserProfileProps {
  profile: ProfileData;
  handle: string;
}

interface TokenData {
  tick: string;
  name?: string;
  balance: string;
  price?: number;
  change24h?: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, handle }) => {
  const [activeTab, setActiveTab] = useState("tokens");
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useHandCash();

  const isOwner = profile.isOwner || (currentUser?.handle === handle);

  const tabs = [
    { id: "tokens", name: "My Tokens", icon: BsLightning, count: tokens.length },
    { id: "collections", name: "Collections", icon: HiCollection, count: collections.length },
    { id: "activity", name: "Activity", icon: HiSparkles, count: 0 },
    { id: "created", name: "Created", icon: FaUser, count: 0 },
  ];

  useEffect(() => {
    // Mock data for now - replace with actual API calls
    setTokens([
      {
        tick: "ORDI",
        name: "Ordinals",
        balance: "1,234.56",
        price: 0.125,
        change24h: 5.2,
      },
      {
        tick: "JEDI",
        name: "Jedi Token",
        balance: "987.21",
        price: 0.089,
        change24h: -2.1,
      }
    ]);
    setIsLoading(false);
  }, [handle]);

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "tokens":
        return (
          <div className="space-y-4">
            {tokens.length === 0 ? (
              <div className="text-center py-12">
                <BsLightning className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
                <p className="text-base-content/60">No tokens found</p>
              </div>
            ) : (
              tokens.map((token) => (
                <div
                  key={token.tick}
                  className="bg-base-200/50 p-4 rounded-modern border border-base-300/30 hover:bg-base-200/70 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{token.tick.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{token.tick}</p>
                        <p className="text-sm text-base-content/60">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold">{token.balance}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-base-content/60">${token.price?.toFixed(3)}</span>
                        <span className={`text-xs font-medium ${
                          (token.change24h || 0) >= 0 ? "text-success" : "text-error"
                        }`}>
                          {(token.change24h || 0) >= 0 ? "+" : ""}{token.change24h?.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case "collections":
        return (
          <div className="text-center py-12">
            <HiCollection className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/60">No collections found</p>
            {isOwner && (
              <Link
                href="/inscribe"
                className="btn btn-primary mt-4"
              >
                Create Collection
              </Link>
            )}
          </div>
        );

      case "activity":
        return (
          <div className="text-center py-12">
            <HiSparkles className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/60">No recent activity</p>
          </div>
        );

      case "created":
        return (
          <div className="text-center py-12">
            <FaUser className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/60">No created tokens found</p>
            {isOwner && (
              <Link
                href="/inscribe"
                className="btn btn-primary mt-4"
              >
                Create Token
              </Link>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-card-gradient rounded-modern-lg shadow-modern-lg overflow-hidden mb-8">
        {/* Cover/Banner Area */}
        <div className="h-32 bg-gradient-to-r from-primary-500/20 to-accent-500/20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full p-1 shadow-modern-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-base-100">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.displayName}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                      <FaUser className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {isOwner && (
              <button className="btn btn-ghost btn-sm">
                <FaCog className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* User Info */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-base-content">{profile.displayName}</h1>
              <div className="px-2 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-medium">
                HandCash Verified
              </div>
            </div>
            <p className="text-lg text-base-content/70 font-mono">@{profile.handle}</p>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-4">
              <div className="text-center">
                <p className="text-xl font-bold text-base-content">{tokens.length}</p>
                <p className="text-sm text-base-content/60">Tokens</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-base-content">{collections.length}</p>
                <p className="text-sm text-base-content/60">Collections</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-base-content">0</p>
                <p className="text-sm text-base-content/60">Created</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/wallet"
              className="btn btn-primary"
            >
              <FaWallet className="w-4 h-4" />
              View Wallet
            </Link>
            <button className="btn btn-ghost">
              <FaExternalLinkAlt className="w-4 h-4" />
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-base-200/30 rounded-modern-lg p-1 mb-6">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-modern transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? "bg-base-100 text-base-content shadow-modern"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-100/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.name}</span>
                {tab.count > 0 && (
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-base-100/50 rounded-modern-lg border border-base-300/30 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserProfile;
