import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { generateAreaData } from '../constants/data';
import { COLORS } from '@/utils/constants/COLORS';

interface AreaChartProps {
    range: 'today' | 'month' | 'year';
}

export default function AreaChart({ range }: AreaChartProps) {
    const theme = useTheme();

    const [categories, setCategories] = useState<string[]>([]);
    const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

    useEffect(() => {
        const area = generateAreaData(range);
        setCategories(area.categories);
        setSeries(area.series);
    }, [range]);

    const options: ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: true, tools: { download: true } },
            height: 400
        },
        stroke: { curve: 'smooth', width: 2 },
        dataLabels: { enabled: false },
        xaxis: {
            categories,
            labels: {
                style: {
                    colors: categories.map(() => theme.palette.text.secondary)
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: [theme.palette.text.secondary]
                }
            }
        },
        colors: COLORS,
        legend: { position: 'bottom' },
        grid: {
            borderColor: theme.palette.divider
        }
    };

    return <ReactApexChart options={options} series={series} type="area" height={400} style={{ flex: 1 }} />;
}
