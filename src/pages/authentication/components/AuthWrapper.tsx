import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '@/components/logo';
import AuthCard from './AuthCard';
import AuthBackground from './AuthBackground';
import AuthFooter from './AuthFooter';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Box sx={{ height: '100vh' }}>
      <AuthBackground />
      <Grid sx={{ ml: 3, my: 3 }}>
        <Logo />
      </Grid>
      <AuthCard>{children}</AuthCard>
      <AuthFooter />
    </Box>
  );
}
