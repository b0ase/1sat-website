import { Suspense } from "react";
import UserProfile from "@/components/pages/profile";

interface ProfilePageProps {
  params: {
    handle: string;
  };
}

// Mock profile data for now
function getProfileData(handle: string) {
  return {
    handle,
    displayName: `User ${handle}`,
    avatarUrl: '',
    isOwner: true,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profileData = getProfileData(params.handle);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      }>
        <UserProfile profile={profileData} handle={params.handle} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const profileData = getProfileData(params.handle);

  return {
    title: `@${params.handle} - ${profileData.displayName || 'User Profile'} | 1Sat Market`,
    description: `View @${params.handle}'s profile, tokens, and activity on 1Sat Market`,
  };
}
