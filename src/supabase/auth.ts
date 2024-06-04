import { supabase } from './supabaseClient';

export class AuthError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

export const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // If sign up is successful, update the user's metadata with the display name
    const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{ id: data.user?.id, display_name: displayName }])
        .single();

    if (profileError) throw profileError;

    return data;
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
