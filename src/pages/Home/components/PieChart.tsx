
import { Box, Card, CardContent, Typography } from "@mui/material";
import { ResponsiveContainer, PieChart as Chart, Pie, Cell, Tooltip, Legend } from "recharts";

import { COLORS, pieData } from "../constants/data";

export default function PieChart() {
    return (
        <Card>
            <CardContent>
                <Typography mb={2}>Waste Breakdown</Typography>
                <Box sx={{ width: '100%', height: { xs: 240, sm: 280, md: 320 } }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <Chart>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </Chart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}