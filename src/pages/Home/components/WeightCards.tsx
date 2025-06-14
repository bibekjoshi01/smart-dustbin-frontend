import { generateWeightData } from '../constants/data';
import { Card, CardContent, Grid, Typography } from '@mui/material';

interface WeightCardProps {
    range: 'today' | 'month' | 'year';
    id?: number;
}

const WeightCards = ({ range, id }: WeightCardProps) => {
    const weightData = generateWeightData(range, id);
    return (
        <Grid container spacing={2} mb={4}>
            {weightData.map((metric, index) => {
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
    )
}

export default WeightCards