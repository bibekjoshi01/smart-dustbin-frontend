import { BIN } from '../Home/constants/data'
import { ArrowBack, LocationOn } from '@mui/icons-material'
import { Box, IconButton, Link, Typography } from '@mui/material'
import { getStatusColor, getStatusIcon } from '@/utils/functions'

const Header = ({ range, bin }: { range: 'today' | 'month' | 'year', bin: BIN }) => {
    return (
        <Box mb={4}>
            <Link href="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton color="primary">
                    <ArrowBack />
                </IconButton>
                Go Back
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    sx={{ mt: -1, ml: -1 }}
                    color={getStatusColor(bin[range].status)}
                >
                    {getStatusIcon(bin[range].status)}
                </IconButton>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    {bin.location} #{bin.id}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <LocationOn color="action" />
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {bin.latitude.toPrecision(8)}, {bin.longitude.toPrecision(8)}
                </Typography>
            </Box>
        </Box>
    )
}

export default Header