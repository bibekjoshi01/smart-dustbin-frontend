export interface BIN {
    id: number;
    location: string;
    latitude: number;
    longitude: number;
    organic: number;
    recyclable: number;
    weight: number;
    status: 'full' | 'empty' | 'normal';
}

export const data: BIN[] = [{
    id: 1,
    location: 'NCIT',
    latitude: 27.671302,
    longitude: 85.338781,
    organic: 5,
    recyclable: 7,
    weight: 13,
    status: 'normal',
}, {
    id: 2,
    location: 'Balkumari Bridge',
    latitude: 27.673266871251275,
    longitude: 85.34209728240968,
    organic: 10,
    recyclable: 8,
    weight: 16,
    status: 'full',
},
{
    id: 3,
    location: 'Balkumari',
    latitude: 27.6709578,
    longitude: 85.3358424,
    organic: 6,
    recyclable: 5,
    weight: 10,
    status: 'full',
}, {
    id: 4,
    location: 'Tourist Bus Park',
    latitude: 27.672858303021865,
    longitude: 85.33409893512726,
    organic: 4,
    recyclable: 8,
    weight: 12,
    status: 'empty',
},
{
    id: 5,
    location: 'Gwarko Chowk',
    latitude: 27.666587064094387,
    longitude: 85.3321838378906,
    organic: 5,
    recyclable: 7,
    weight: 8,
    status: 'normal',
}
]

export const barData = data.map((bin) => ({
    bin: bin.location,
    Organic: bin.organic,
    Recyclable: bin.recyclable,
}));

export const pieData = [
    {
        name: 'Organic',
        value: barData.reduce((sum, item) => sum + item.Organic, 0),
    },
    {
        name: 'Recyclable',
        value: barData.reduce((sum, item) => sum + item.Recyclable, 0),
    },
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];