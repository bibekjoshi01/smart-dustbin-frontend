import { Error } from "@mui/icons-material"
import { Box, Paper, Typography } from "@mui/material"

const BinNotFound = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
        >
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Error color="error" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h5" color="error" gutterBottom>
                    Bin Not Found
                </Typography>
                <Typography color="text.secondary">
                    The requested bin could not be located.
                </Typography>
            </Paper>
        </Box>
    )
}

export default BinNotFound