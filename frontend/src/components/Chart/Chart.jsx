import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const Chart = ({ labels, data, options, config }) => {
    const chartData = {
        labels,
        datasets: [
            {
                data: data,
                ...config,
            },
        ],
    };

    return <Line data={chartData} options={options} />;
};

Chart.propTypes = {
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
};
export default Chart;
