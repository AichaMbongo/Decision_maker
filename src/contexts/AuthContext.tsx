import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  signIn as signInSupabase, 
  signOut as signOutSupabase, 
  signUp as signUpSupabase, 
  getUser,
  resetPassword as resetPasswordSupabase,
  updatePassword as updatePasswordSupabase
} from '../supabase/auth';
import { User, Session } from '@supabase/supabase-js'; // Import Supabase types

interface SignUpResponse {
  user: User | null;
  session: Session | null;
  confirmationRequired?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<SignUpResponse>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await getUser();
      if (user) {
        setIsAuthenticated(true);
        setUserProfile(user);
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInSupabase(email, password);
    await checkAuth(); // Re-fetch user data after signing in
  };

  const signOut = async () => {
    await signOutSupabase();
    await checkAuth(); // Re-fetch user data after signing out
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const data = await signUpSupabase(email, password, firstName, lastName);
      await checkAuth(); // Update auth state after signup
      return data;
    } catch (error) {
      console.error("SignUp error in AuthContext:", error);
      throw error; // Re-throw the error to be handled by the component
    }
  };

  const resetPassword = async (email: string) => {
    return await resetPasswordSupabase(email);
  };

  const updatePassword = async (newPassword: string) => {
    return await updatePasswordSupabase(newPassword);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userProfile, 
      signIn, 
      signOut, 
      signUp,
      resetPassword,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
