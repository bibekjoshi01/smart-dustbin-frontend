import { Box } from "@mui/material";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

export default function Home() {
  return (
    <>
      <Box sx={{ mt: 1, display: 'grid', gridAutoFlow: 'column', gap: 2 }}>
        <BarChart />
        <PieChart />
      </Box>
    </>
  );
}
