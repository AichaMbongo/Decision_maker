import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const { resetPassword, updatePassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we're in the password update phase (after clicking email link)
    const isUpdatePhase = location.hash.includes('#access_token=');

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            setMessage({
                type: 'success',
                text: 'Password reset link has been sent to your email.'
            });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Failed to send reset link'
            });
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updatePassword(newPassword);
            setMessage({
                type: 'success',
                text: 'Password has been successfully updated.'
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Failed to update password'
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Reset Password
                </Typography>
                {message && (
                    <Alert severity={message.type} sx={{ mb: 2 }}>
                        {message.text}
                    </Alert>
                )}
                {!isUpdatePhase ? (
                    <form onSubmit={handleResetRequest}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </Typography>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Send Reset Link
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordUpdate}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Enter your new password below.
                        </Typography>
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update Password
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
};
