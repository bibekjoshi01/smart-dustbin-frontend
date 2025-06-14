import { Box, Card, CardContent, Typography } from "@mui/material";
import {
    PieChart as Chart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { name: string; value: number }[];
}

const COLORS = ["#00C49F", "#0088FE"];

export default function PieChart({ data }: Props) {
    return (
        <Card>
            <CardContent>
                <Typography mb={2}>Waste Breakdown</Typography>
                <Box sx={{ width: "100%", height: { xs: 240, sm: 280, md: 320 } }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <Chart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
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
