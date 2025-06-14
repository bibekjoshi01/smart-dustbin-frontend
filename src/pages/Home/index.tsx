import { useState } from "react";
import { Box } from "@mui/material";
import BinMap from "./components/Map";
import Charts from "./components/Charts";

export default function Home() {
  const [range, setRange] = useState<'today' | 'month' | 'year'>('today');

  return (
    <>
      <Box sx={{ mt: 2 }}>

        {/* Charts */}
        <Charts
          range={range}
          setRange={setRange}
        />

        {/* MAP */}
        <BinMap />
      </Box>
    </>
  );
}
