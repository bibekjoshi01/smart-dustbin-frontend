import { COLORS } from "@/utils/constants/COLORS";
import {
    Delete,
    Recycling,
    Scale,
} from "@mui/icons-material";

export interface BinDataDetail {
    organic: number;
    recyclable: number;
    weight: number;
    status: 'full' | 'empty' | 'normal';
    date: string; // YYYY-MM-DD
}

export interface BIN {
    id: number;
    location: string;
    latitude: number;
    longitude: number;
    today: BinDataDetail;
    month: BinDataDetail;
    year: BinDataDetail;
}

export const binData: BIN[] = [
    {
        id: 1,
        location: 'NCIT',
        latitude: 27.671302,
        longitude: 85.338781,
        today: {
            organic: 5,
            recyclable: 7,
            weight: 13,
            status: 'normal',
            date: '2025-06-14',
        },
        month: {
            organic: 20,
            recyclable: 25,
            weight: 45,
            status: 'normal',
            date: '2025-06-01',
        },
        year: {
            organic: 200,
            recyclable: 230,
            weight: 430,
            status: 'normal',
            date: '2025-01-01',
        },
    },
    {
        id: 2,
        location: 'Balkumari Bridge',
        latitude: 27.673266871251275,
        longitude: 85.34209728240968,
        today: {
            organic: 10,
            recyclable: 8,
            weight: 16,
            status: 'full',
            date: '2025-06-14',
        },
        month: {
            organic: 40,
            recyclable: 32,
            weight: 72,
            status: 'full',
            date: '2025-06-01',
        },
        year: {
            organic: 300,
            recyclable: 280,
            weight: 580,
            status: 'full',
            date: '2025-01-01',
        },
    },
    {
        id: 3,
        location: 'Balkumari',
        latitude: 27.6709578,
        longitude: 85.3358424,
        today: {
            organic: 6,
            recyclable: 5,
            weight: 10,
            status: 'full',
            date: '2025-06-13',
        },
        month: {
            organic: 18,
            recyclable: 20,
            weight: 38,
            status: 'normal',
            date: '2025-06-01',
        },
        year: {
            organic: 160,
            recyclable: 170,
            weight: 330,
            status: 'normal',
            date: '2025-01-01',
        },
    },
    {
        id: 4,
        location: 'Tourist Bus Park',
        latitude: 27.672858303021865,
        longitude: 85.33409893512726,
        today: {
            organic: 4,
            recyclable: 8,
            weight: 12,
            status: 'empty',
            date: '2025-05-30',
        },
        month: {
            organic: 15,
            recyclable: 28,
            weight: 43,
            status: 'empty',
            date: '2025-05-01',
        },
        year: {
            organic: 130,
            recyclable: 140,
            weight: 270,
            status: 'empty',
            date: '2025-01-01',
        },
    },
    {
        id: 5,
        location: 'Gwarko Chowk',
        latitude: 27.666587064094387,
        longitude: 85.3321838378906,
        today: {
            organic: 5,
            recyclable: 7,
            weight: 8,
            status: 'normal',
            date: '2025-04-15',
        },
        month: {
            organic: 12,
            recyclable: 18,
            weight: 30,
            status: 'normal',
            date: '2025-04-01',
        },
        year: {
            organic: 100,
            recyclable: 130,
            weight: 230,
            status: 'normal',
            date: '2025-01-01',
        },
    },
];

// Functions to get data by range for charting
export function getBinsByRange(range: 'today' | 'month' | 'year', id?: number) {
    return binData.filter((bin) => (id ? bin.id === id : true)).map((bin) => {
        return {
            id: bin.id,
            location: bin.location,
            latitude: bin.latitude,
            longitude: bin.longitude,
            ...bin[range],
        };
    });
}

export function generateBarData(range: 'today' | 'month' | 'year', id?: number): BarChartData[] {
    const bins = getBinsByRange(range, id);
    return bins.map((bin) => ({
        bin: bin.location,
        Organic: bin.organic,
        Recyclable: bin.recyclable,
    }));
}

export function generatePieData(range: 'today' | 'month' | 'year', id?: number): PieChartData[] {
    const barData = generateBarData(range, id);
    return [
        {
            name: 'Organic',
            value: barData.reduce((sum, item) => sum + item.Organic, 0),
        },
        {
            name: 'Recyclable',
            value: barData.reduce((sum, item) => sum + item.Recyclable, 0),
        },
    ];
}

// Function to generate weight card data for a bin or all bins
export function generateWeightData(
    range: 'today' | 'month' | 'year',
    id?: number,
): WeightCardData[] {
    let organic = 0;
    let recyclable = 0;
    let weight = 0;

    if (id) {
        const bin = binData.find((b) => b.id === id);
        if (!bin) return [];
        organic = bin[range].organic;
        recyclable = bin[range].recyclable;
        weight = bin[range].weight;
    } else {
        // Sum all bin values
        for (const bin of binData) {
            organic += bin[range].organic;
            recyclable += bin[range].recyclable;
            weight += bin[range].weight;
        }
    }

    return [
        {
            label: 'Total Weight (kg)',
            value: weight,
            icon: Scale,
            color: 'info.main'
        },
        {
            label: 'Organic items',
            value: organic,
            icon: Delete,
            color: COLORS[0]
        },
        {
            label: 'Recyclable items',
            value: recyclable,
            icon: Recycling,
            color: COLORS[1]
        }
    ];
}

export function generateAreaData(range: 'today' | 'month' | 'year'): AreaChartData {
    const bins = getBinsByRange(range);

    const categories: string[] = [];
    const organicSeries: number[] = [];
    const recyclableSeries: number[] = [];

    for (const bin of bins) {
        categories.push(bin.location);
        organicSeries.push(bin.organic);
        recyclableSeries.push(bin.recyclable);
    }

    return {
        categories,
        series: [
            { name: 'Organic', data: organicSeries },
            { name: 'Recyclable', data: recyclableSeries }
        ]
    };
}

export interface WeightCardData {
    label: string;
    value: number;
    icon: React.ElementType;
    color: string;
}
export interface BarChartData {
    bin: string;
    Organic: number;
    Recyclable: number;
}
export interface PieChartData {
    name: 'Organic' | 'Recyclable';
    value: number;
}
export interface AreaChartData {
    categories: string[];
    series: { name: string; data: number[] }[];
}