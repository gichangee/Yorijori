export const lineOptions = (yAxisMax, yAxisMin) => {
    return {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    max: yAxisMax,
                    min: yAxisMin,
                },
            },
        },
    };
};

export const smallLineOptions = () => {
    return {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,

                grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                },
            },
        },
    };
};

const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
export const smallLineConfig = (color) => {
    return {
        borderColor: color,
        borderWidth: 6,
        pointRadius: 0,
    };
};
export const lineConfig = (color) => {
    return {
        borderColor: color,
        backgroundColor: (context) => {
            const bgColors = [
                hexToRgba(color, 0.6),
                hexToRgba(color, 0.3),
                hexToRgba(color, 0.2),
            ];
            if (!context.chart.chartArea) {
                return null;
            }
            const {
                ctx,
                chartArea: { top, bottom },
            } = context.chart;

            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            gradientBg.addColorStop(0.3, bgColors[0]);
            gradientBg.addColorStop(0.7, bgColors[1]);
            gradientBg.addColorStop(1, bgColors[2]);

            return gradientBg;
        },
        fill: true,
        borderWidth: 3,
        pointRadius: 2,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverRadius: 8,
        tension: 0.4,
    };
};

export const barConfig = (color) => {
    return {
        barThickness: 5,
        borderRadius: 10,
        backgroundColor: color,
        borderColor: color,
    };
};

export const barOptions = (data, color) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        aspectRatio: 1,

        scales: {
            x: {
                beginAtZero: true,
                stacked: true,
                display: true,
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                border: {
                    display: false,
                },
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: true,
                    font: {
                        size: 11,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: "end",
                align: "end",
                formatter: (value, context) => {
                    const index = context.dataIndex;
                    const count = data[index];
                    return count;
                },
                color: color,
            },
        },
    };
};
export const pieConfig = () => {
    return {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "right",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    };
};
