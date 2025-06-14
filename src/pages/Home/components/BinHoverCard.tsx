import { Paper, Typography, Box, Divider } from "@mui/material";
import { BIN } from "../constants/data";

interface Props {
    bin: BIN;
}

export default function BinHoverCard({ bin }: Props) {
    return (
        <Paper
            elevation={4}
            sx={{
                position: "absolute",
                top: 16,
                right: 16,
                px: 2,
                py: 1.5,
                minWidth: 220,
                maxWidth: 280,
                borderRadius: 2,
                zIndex: 999,
                backgroundColor: "#fefefe",
                boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {bin.location}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight={500}>
                    Status:
                </Typography>
                <Typography variant="body2">{bin.status}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight={500}>
                    Organic:
                </Typography>
                <Typography variant="body2">{bin.organic} items</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight={500}>
                    Recyclable:
                </Typography>
                <Typography variant="body2">{bin.recyclable} items</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight={500}>
                    Total:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                    {bin.organic + bin.recyclable} items
                </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight={600}>
                    Total:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {bin.weight} kg
                </Typography>
            </Box>
        </Paper>
    );
}
