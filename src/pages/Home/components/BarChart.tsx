import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { generateBarData } from '../constants/data';
import { COLORS } from '@/utils/constants/COLORS';

interface BarChartProps {
    range: 'today' | 'month' | 'year';
    id?: number;
}

export default function BarChart({ range, id }: BarChartProps) {
    const theme = useTheme();
    const [barSeries, setBarSeries] = useState<{ name: string; data: number[] }[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const barData = generateBarData(range, id);
        setCategories(barData.map((item) => item.bin));
        setBarSeries([
            {
                name: 'Organic',
                data: barData.map((item) => item.Organic)
            },
            {
                name: 'Recyclable',
                data: barData.map((item) => item.Recyclable)
            }
        ]);
    }, [range, id]);

    const options: ApexOptions = {
        chart: { type: 'bar', stacked: false, toolbar: { show: true, tools: { download: true } }, },
        xaxis: {
            categories,
            labels: { style: { colors: categories.map(() => theme.palette.text.secondary) } }
        },
        colors: COLORS,
        legend: { position: 'bottom' },
        plotOptions: { bar: { borderRadius: 4, columnWidth: '45%' } },
        dataLabels: { enabled: false }
    };

    return <ReactApexChart options={options} series={barSeries} type="bar" height={350} style={{ flex: 1 }} />;
}
