import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { generatePieData } from '../constants/data';

interface PieChartProps {
    range: 'today' | 'month' | 'year';
    id?: number;
}

export default function PieChart({ range, id }: PieChartProps) {
    const theme = useTheme();
    const [series, setSeries] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [chartKey, setChartKey] = useState<number>(0);

    useEffect(() => {
        const pie = generatePieData(range, id);
        setLabels(pie.map((d) => d.name));
        setSeries(pie.map((d) => d.value));
        setChartKey(prev => prev + 1);
    }, [range, id]);

    const options: ApexOptions = {
        chart: {
            type: 'pie',
            toolbar: {
                show: true,
                tools: {
                    download: true
                }
            }
        },
        labels,
        colors: ['#00C49F', '#0088FE'],
        legend: {
            position: 'bottom',
            labels: {
                colors: [theme.palette.text.primary]
            }
        }
    };

    return (
        <ReactApexChart
            key={chartKey}
            options={options}
            series={series}
            type="pie"
            height={350}
            style={{ flex: 1 }}
        />
    );
}
