import React, { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Project Imports
import { LoginFormDataType } from '../redux/types';
import { useLogin } from '../hooks/useLogin';

export default function AuthLogin() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<LoginFormDataType>({ email: '', password: '' });
  const { handleSubmit, loadingLogin, } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(values);
  };

  function handleTogglePassword(): void {
    setShowPassword((prev) => !prev);
  }

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid container spacing={3}>
        <Grid>
          <Grid container spacing={2}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="text"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="h6">Keep me sign in</Typography>}
            />
          </Stack>
        </Grid>
        <Button disabled={loadingLogin} fullWidth size="large" sx={{ mt: 0.5 }} type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Grid>
    </form >
  );
}
