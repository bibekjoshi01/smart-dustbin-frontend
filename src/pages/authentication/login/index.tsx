import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from '../components/AuthWrapper';
import AuthLogin from './AuthLogin';

export default function Login() {
  return (
    <React.Fragment>
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Login</Typography>
            </Stack>
          </Grid>
          <Grid>
            <AuthLogin />
          </Grid>
        </Grid>
      </AuthWrapper>
    </React.Fragment>
  );
}
