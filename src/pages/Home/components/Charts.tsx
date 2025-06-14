import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import WeightCards from "./WeightCards";
import AreaChart from "./AreaChart";

interface ChartsProps {
    range: 'today' | 'month' | 'year';
    setRange: React.Dispatch<React.SetStateAction<'today' | 'month' | 'year'>>;
    id?: number;
}

export default function Charts({ range, setRange, id }: ChartsProps) {
    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            {/* Input field */}
            <Box sx={{ display: 'flex', justifySelf: 'flex-end' }}>
                <TextField
                    select
                    value={range}
                    onChange={(e) => setRange(e.target.value as 'today' | 'month' | 'year')}
                    label="Range"
                    size="small"
                    sx={{ mb: 2, alignSelf: 'flex-end', width: 120, }}
                >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                </TextField>
            </Box>

            {/* Weight cards  */}
            <Box>
                <WeightCards range={range} id={id} />
            </Box>

            {/* Actual charts */}
            <Grid spacing={2} sx={{ mb: 6, alignItems: 'center', justifyContent: 'space-evenly', }} container columns={{ xs: 1, sm: 2 }}>
                <BarChart range={range} id={id} />
                <PieChart range={range} id={id} />
            </Grid>

            {/* Area chart only if not in detailed page */}
            {!id && <Box>
                <AreaChart range={range} />
            </Box>}
        </Box>
    );
}
