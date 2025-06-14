import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    IconButton,
} from "@mui/material";
import {
    LocationOn,
    Delete,
    Recycling,
    Scale,
    CheckCircle,
    Warning,
    Error,
    ArrowBack
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import BarChart from "../Home/components/BarChart";
import PieChart from "../Home/components/PieChart";
import { data as bins, BIN } from "../Home/constants/data";
import Link from '@mui/material/Link';
import MapDetailed from "./MapDetailed";

export default function BinDetails() {
    const { id } = useParams();
    const bin: BIN | undefined = bins.find((b) => b.id === Number(id));

    if (!bin)
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
        );

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'full': return 'error';
            case 'almost full': return 'warning';
            case 'empty': return 'success';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'full': return <Error />;
            case 'almost full': return <Warning />;
            case 'empty': return <CheckCircle />;
            default: return <CheckCircle />;
        }
    };

    const barData = [
        {
            bin: `Bin ${bin.id}`,
            Organic: bin.organic,
            Recyclable: bin.recyclable,
        },
    ];

    const pieData = [
        { name: "Organic", value: bin.organic },
        { name: "Recyclable", value: bin.recyclable },
    ];

    const weightCards = [
        {
            label: 'Total Weight (kg)',
            value: bin.weight,
            icon: Scale,
            color: 'primary.main'
        },
        {
            label: 'Organic items',
            value: bin.organic,
            icon: Delete,
            color: 'success.main'
        },
        {
            label: 'Recyclable items',
            value: bin.recyclable,
            icon: Recycling,
            color: 'info.main'
        }
    ]

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            {/* Header */}
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
                        color={getStatusColor(bin.status)}
                    >
                        {getStatusIcon(bin.status)}
                    </IconButton>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Bin #{bin.id}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn color="action" />
                    <Typography variant="h6" color="text.secondary">
                        {bin.location}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {bin.latitude}, {bin.longitude}
                    </Typography>
                </Box>
            </Box>

            {/* Weight Summary Cards */}
            <Grid container spacing={2} mb={4}>
                {weightCards.map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                        <Grid key={index} sx={{ flex: 1, minWidth: 200 }}>
                            <Card elevation={3} sx={{ textAlign: 'center', bgcolor: metric.color, color: 'white' }}>
                                <CardContent>
                                    <IconComponent sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="h4" fontWeight={700}>
                                        {metric.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        {metric.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ display: 'grid', gridAutoFlow: 'column', gap: 2, mt: 4 }}>
                <BarChart data={barData} />
                <PieChart data={pieData} />
            </Grid>

            {/* Detailed Map view */}
            <MapDetailed bin={bin} />
        </Box >
    );
}