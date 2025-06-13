import React, { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Project Imports
import LoginFormSection from './FormSection';
import { LoginFormDataType } from '../redux/types';
import { useLogin } from '../hooks/useLogin';

export default function AuthLogin() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<LoginFormDataType>({ persona: '', password: '' });
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
          <LoginFormSection
            values={values}
            showPassword={showPassword}
            onChange={handleChange}
            onTogglePassword={handleTogglePassword}
          />
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
