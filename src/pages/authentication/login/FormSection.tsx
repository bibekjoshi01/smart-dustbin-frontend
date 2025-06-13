import React from 'react';
import { Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginFormSection({
    values,
    showPassword,
    onChange,
    onTogglePassword,
}: {
    values: { persona: string; password: string };
    showPassword: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
}) {
    return (
        <Grid container spacing={2}>
            <TextField
                fullWidth
                label="Email or Username"
                name="persona"
                type="text"
                placeholder="Enter email or username"
                value={values.persona}
                onChange={onChange}
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={values.password}
                onChange={onChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onTogglePassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    );
}