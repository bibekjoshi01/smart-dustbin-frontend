import {
    Box,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import BinNotFound from "./BinNotFound";
import MapDetailed from "./MapDetailed";
import { useParams } from "react-router-dom";
import Charts from "../Home/components/Charts";
import { binData as bins, BIN } from "../Home/constants/data";

export default function BinDetails() {
    const { id } = useParams();
    const bin: BIN | undefined = bins.find((b) => b.id === Number(id));
    const [range, setRange] = useState<'today' | 'month' | 'year'>('today');

    if (!bin)
        return <BinNotFound />

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            {/* Header */}
            <Header range={range} bin={bin} />

            {/* Charts Section */}
            <Charts range={range} setRange={setRange} id={Number(id)} />

            {/* Detailed Map view */}
            <MapDetailed bin={bin} range={range} />
        </Box >
    );
}


