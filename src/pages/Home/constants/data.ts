export const barData = [
    { bin: 'Bin A', Organic: 5, Recyclable: 7 },
    { bin: 'Bin B', Organic: 10, Recyclable: 8 },
    { bin: 'Bin C', Organic: 9, Recyclable: 2 },
    { bin: 'Bin D', Organic: 4, Recyclable: 10 },
];

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