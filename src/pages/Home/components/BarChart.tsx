import { Box, Card, CardContent, Typography } from "@mui/material";
import {
    BarChart as Chart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { bin: string; Organic: number; Recyclable: number }[];
}

export default function BarChart({ data }: Props) {
    return (
        <Card sx={{ transition: "all 0.3s" }}>
            <CardContent>
                <Typography mb={2}>Waste per Bin</Typography>
                <Box sx={{ width: "100%", height: { xs: 240, sm: 280, md: 320 } }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <Chart data={data}>
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
