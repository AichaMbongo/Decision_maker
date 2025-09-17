import { supabase } from './supabaseClient';

export class AuthError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        // Attempt to sign up the user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName
                }
            }
        });
        
        if (signUpError) {
            console.error("Supabase signup error:", signUpError);
            throw new AuthError(signUpError.message, signUpError.code ?? 'SIGNUP_ERROR');
        }

        if (!authData.user) {
            throw new AuthError('User creation failed', 'USER_CREATION_FAILED');
        }

        // Check if email confirmation is required
        if (!authData.session) {
            // Email confirmation is required
            return {
                user: authData.user,
                session: null
            };
        }

        // If we have a session, create the profile
        const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .insert([{ 
                id: authData.user.id, 
                first_name: firstName,
                last_name: lastName,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (profileError) {
            console.error("Profile creation error:", profileError);
            throw new AuthError(profileError.message, profileError.code ?? 'PROFILE_ERROR');
        }

        return {
            user: authData.user,
            session: authData.session
        };
    } catch (error) {
        console.error("SignUp process error:", error);
        if (error instanceof AuthError) {
            throw error;
        }
        // Handle unknown error type
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during signup';
        throw new AuthError(errorMessage, 'UNKNOWN_ERROR');
    }
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw new AuthError(error.message, error.code ?? 'UNKNOWN_ERROR');
    }
    return data.user;
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
    return data;
};

export const getUser = () => {
    return supabase.auth.getUser();
};

export const getUserId = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    return null; // Handle the error according to your needs
  }

  return data?.user?.id ?? null;
};

export const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) {
        throw new AuthError(error.message, error.code ?? 'RESET_PASSWORD_ERROR');
    }
    return true;
};

export const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });
    if (error) {
        throw new AuthError(error.message, error.code ?? 'UPDATE_PASSWORD_ERROR');
    }
    return true;
};
