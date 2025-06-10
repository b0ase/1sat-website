import { Suspense } from "react";
import UserProfile from "@/components/pages/profile";
import { getUserProfile } from "@/utils/handcash";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    handle: string;
  };
}

async function getProfileData(handle: string) {
  try {
    // For now, we can only get the current user's profile
    // Later we might want to implement a user directory
    const cookieStore = cookies();
    const authToken = cookieStore.get('handcash_auth_token')?.value;
    const userCookie = cookieStore.get('handcash_user')?.value;

    if (!authToken || !userCookie) {
      return null;
    }

    const userData = JSON.parse(userCookie);

    // Check if this is the current user's profile
    if (userData.handle !== handle) {
      // For now, only allow viewing your own profile
      return null;
    }

    // Get full profile data
    const { publicProfile } = await getUserProfile(authToken);

    return {
      ...publicProfile,
      isOwner: true,
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profileData = await getProfileData(params.handle);

  if (!profileData) {
    notFound();
  }

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
  const profileData = await getProfileData(params.handle);

  if (!profileData) {
    return {
      title: "Profile Not Found - 1Sat Market",
    };
  }

  return {
    title: `@${params.handle} - ${profileData.displayName || 'User Profile'} | 1Sat Market`,
    description: `View @${params.handle}'s profile, tokens, and activity on 1Sat Market`,
  };
}
