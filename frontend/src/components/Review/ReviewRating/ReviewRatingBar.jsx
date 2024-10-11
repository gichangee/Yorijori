import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTheme } from "styled-components";
import { reviewPercentageArr } from "../../../util/review-rating";
import { barLabels } from "../../../constants/chart.js";
import { barConfig, barOptions } from "../../../util/get-chart-config";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    ChartDataLabels,
);

function ReviewRatingBar({ rating }) {
    const dataSumPercentage = reviewPercentageArr(rating);
    const theme = useTheme();

    const darkColor = theme.color.gray.dark;
    const labels = barLabels();
    const config = barConfig("#FFBC0B");

    const data = {
        labels,
        datasets: [
            {
                data: dataSumPercentage,
                ...config,
            },
        ],
    };

    const options = barOptions(rating, darkColor);

    return <Bar data={data} options={options} />;
}
ReviewRatingBar.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default ReviewRatingBar;
