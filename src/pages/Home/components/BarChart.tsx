import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart as Chart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { barData } from "../constants/data";


export default function BarChart() {
    return (
        <Card>
            <CardContent>
                <Typography mb={2}>Waste per Bin</Typography>
                <Box sx={{ width: '100%', height: { xs: 240, sm: 280, md: 320 } }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <Chart data={barData}>
                            <XAxis dataKey="bin" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Organic" fill="#00C49F" />
                            <Bar dataKey="Recyclable" fill="#0088FE" />
                        </Chart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}