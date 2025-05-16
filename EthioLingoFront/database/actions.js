import { db } from './db'; 
import { userProfilesTable, usersTable } from './schema';
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';
import { eq } from 'drizzle-orm';
import { getDBConnection } from './db';
import { API_URL } from '@env';


const retryFetch = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) return response;
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying fetch (${i + 1}/${retries}) after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

// Fetch and cache user info
export const fetchAndCacheUser = async (userId) => {
  const db = await getDBConnection();

  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.log('Offline: Skipping user API fetch');
      return false;
    }

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userId, userId))
      .all();

    const isStale = !existingUser?.lastSynced ||
      new Date() - new Date(existingUser.lastSynced) > 24 * 60 * 60 * 1000;

    if (!isStale && existingUser) {
      console.log('User cache is fresh');
      return true;
    }

    const res = await retryFetch(`${API_URL}/api/users/${userId}`);
    console.log('Fetched user response:', res.status);
    
    if (!res.ok) throw new Error('Failed to fetch user');

    const json = await res.json();
    console.log('🧪 Full user JSON:', json);

    const user = json
    console.log('✅ User from API:', user);

    if (!user?.userId || !user?.fullName || !user?.email) {
      throw new Error('Incomplete user data');
    }

    const now = new Date();

    await db
      .insert(usersTable)
      .values({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        createdAt: now,
        updatedAt: now,
        syncStatus: 'synced',
        lastSynced: now,
      })
      .onConflictDoUpdate({
        target: usersTable.userId,
        set: {
          fullName: user.fullName,
          email: user.email,
          updatedAt: now,
          syncStatus: 'synced',
          lastSynced: now,
        },
      });

    console.log('User cached successfully');
    return true;
  } catch (err) {
    console.error('❌ Error fetching user:', err.message, err.stack);
    return false;
  }
};


export const fetchAndCacheUserProfile = async (userId) => {
  const db = await getDBConnection();

  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.log('Offline: Skipping user profile fetch');
      return false;
    }

    const [existingProfile] = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.userId, userId))
      .all();

    const isStale =
      !existingProfile?.lastSynced ||
      new Date() - new Date(existingProfile.lastSynced) > 24 * 60 * 60 * 1000;

    if (!isStale && existingProfile) {
      console.log('User profile cache is fresh');
      return true;
    }

    const res = await retryFetch(`${API_URL}/api/profile/${userId}`);
    console.log('Fetched user profile response:', res.status);

    if (!res.ok) throw new Error('Failed to fetch user profile');

    const profile = await res.json();
    console.log('🧪 Full user profile JSON:', profile);

    const now = new Date();

    await db
      .insert(userProfilesTable)
      .values({
        userId: profile.userId,
        profileImage: profile.profileImage || undefined,
        status: profile.status || 'free',
        nativeLanguage: profile.nativeLanguage || 'English',
        learningLanguage: profile.learningLanguage,
        goalTime: profile.goalTime,
        favoriteWords: JSON.stringify(profile.favoriteWords || []),
        lastSynced: now,
        syncStatus: 'synced',
      })
      .onConflictDoUpdate({
        target: userProfilesTable.userId,
        set: {
          profileImage: profile.profileImage || undefined,
          status: profile.status || 'free',
          nativeLanguage: profile.nativeLanguage || 'English',
          learningLanguage: profile.learningLanguage,
          goalTime: profile.goalTime,
          favoriteWords: JSON.stringify(profile.favoriteWords || []),
          lastSynced: now,
          syncStatus: 'synced',
        },
      });

    console.log('User profile cached successfully');
    return true;
  } catch (err) {
    console.error('❌ Error fetching user profile:', err.message);
    return false;
  }
};


export const getUserDataFromSQLite = async (userId) => {
  try {
    const db = await getDBConnection();

    // Fetch user data
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userId, userId))
      .limit(1);

    // Fetch profile data
    const profile = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.userId, userId))
      .limit(1);

    if (!user[0] || !profile[0]) {
      throw new Error('User or profile not found');
    }

    // Combine data
    return {
      userId,
      fullName: user[0].fullName,
      email: user[0].email,
      goalTime: profile[0].goalTime,
      profileImage: profile[0].profileImage,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
      syncStatus: user[0].syncStatus,
      status: profile[0].status,
      nativeLanguage: profile[0].nativeLanguage,
      learningLanguage: profile[0].learningLanguage,
      favoriteWords: profile[0].favoriteWords,
    };
  } catch (error) {
    console.error('❌ Error fetching user data:', error);
    throw error;
  }
};

export const clearSQLiteData = async () => {
  const db = await getDBConnection();

  await db.delete(usersTable).run();
  await db.delete(userProfilesTable).run();

  console.log('🧹 SQLite data cleared');
};

export const updateProfileLocally = async (userId, updatedData, setProfileData) => {
  try {
    const db = await getDBConnection();
    const now = new Date();

    // Ensure required fields are not undefined
    const { fullName, goalTime, profileImage } = updatedData;

    // Perform updates in a transaction
    await db.transaction(async (tx) => {
      // Update usersTable
      await tx
        .update(usersTable)
        .set({
          fullName: fullName || '',
          updatedAt: now,
          syncStatus: 'pending',
        })
        .where(eq(usersTable.userId, userId));

      // Update userProfilesTable
      await tx
        .update(userProfilesTable)
        .set({
          goalTime: goalTime !== undefined ? goalTime : 0,
          profileImage: profileImage || null,
          syncStatus: 'pending',
        })
        .where(eq(userProfilesTable.userId, userId));
    });

    console.log("✅ Local profile update successful");

    // Fetch latest data and update UI
    if (setProfileData) {
      const freshData = await getUserDataFromSQLite(userId);
      setProfileData(freshData);
    }

    return true;
  } catch (error) {
    console.error("❌ Error updating profile locally:", error);
    throw error;
  }
};

