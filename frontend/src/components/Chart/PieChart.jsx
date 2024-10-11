import { Pie } from "react-chartjs-2"; // Doughnut 컴포넌트를 임포트
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as S from "./Chart.styled";
import { pieLabels } from "../../constants/chart";
import { pieConfig } from "../../util/get-chart-config";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const labels = pieLabels();
    const data = {
        labels,
        datasets: [
            {
                data: [6, 50, 1, 0.075, 2, 0, 0.3, 0],
                backgroundColor: [
                    "rgb(81, 157, 233)",
                    "rgb(124, 198, 116)",
                    "rgb(115, 197, 197)",
                    "rgb(246, 209, 115)",
                    "rgb(132, 129, 221)",
                    "rgb(163, 0, 0)",
                    "rgb(210, 210, 210)",
                ],
                hoverOffset: 4,
            },
        ],
    };
    const options = pieConfig();

    const config = {
        type: "doughnut",
        data: data,
        options,
    };

    return (
        <S.Wrapper>
            <S.PieWrapper>
                <Pie data={data} options={config.options} />;
            </S.PieWrapper>
        </S.Wrapper>
    );
};

export default PieChart;
