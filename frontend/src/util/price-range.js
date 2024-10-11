export const calculatePriceChangeRange = (data) => {
    const prices = data
        .map((item) => parseFloat(item))
        .filter((price) => !isNaN(price));

    if (prices.length === 0) {
        return { yAxisMin: 0, yAxisMax: 0 };
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const padding = (maxPrice - minPrice) * 0.1;
    const yAxisMin = Math.max(0, minPrice - padding);
    const yAxisMax = maxPrice + padding;

    return {
        yAxisMin,
        yAxisMax,
    };
};
