import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div style={{ textAlign: 'center' }}>
    <img
      src='/404ErrorPage.svg'
      alt='404 page not found image'
      style={{
        maxWidth: '100%',
        height: '60vh',
        marginBottom: '20px'
      }}
    />
    <h1>404 - Page Not Found</h1>
    <p>The page you&apos;re looking for was moved, removed, renamed, or might never exist!</p>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" component={Link} to="/">
        Back Home
      </Button>
    </Box>
  </div>
);

export default PageNotFound;
