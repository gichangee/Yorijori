import { calculatePriceChangeRange } from "../../../util/price-range";
import { lineConfig, lineOptions } from "../../../util/get-chart-config";
import * as S from "./YearlyPriceChart.styled";
import Tag from "../../Tag/Tag";
import { useState } from "react";
import Chart from "../../Chart/Chart";

import PropTypes from "prop-types";
import EmptyPlaceHolder from "../../EmptyPlaceholder/EmptyPlaceHolder";

const YearlyPriceChart = ({ priceHistory }) => {
    const allZero = priceHistory.monthPrice.every((item) => item.price === 0);
    const [viewType, setViewType] = useState(0);
    if (allZero)
        return (
            <EmptyPlaceHolder
                height="15rem"
                width="100%"
                content="물가 정보가 없습니다"
                recommend={"조금만 기다려잉 ~ "}
            />
        );
    const priceArr = [
        priceHistory.monthPrice.map((item) => item.price),
        priceHistory.weekPrice.map((item) => item.price),
        priceHistory.dayPrice.map((item) => item.price),
    ];
    const labels = [
        priceHistory.monthPrice.map((item) => item.day),
        priceHistory.weekPrice.map((item) => item.day),
        priceHistory.dayPrice.map((item) => item.day),
    ];

    const yAxis = priceArr.map((priceData) => {
        const { yAxisMin, yAxisMax } = calculatePriceChangeRange(priceData);
        return { yAxisMin, yAxisMax };
    });

    const chartOptions = yAxis.map(({ yAxisMax, yAxisMin }) =>
        lineOptions(yAxisMax, yAxisMin),
    );

    const handleClick = (status) => {
        setViewType(status);
    };

    const config = lineConfig("#2DB400");
    const tag = ["월간", "주간", "일간"];
    return (
        <S.Wrapper>
            <S.TagWrapper>
                {tag.map((item, index) => (
                    <Tag
                        key={index}
                        tag={item}
                        isClicked={index === viewType}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </S.TagWrapper>
            <S.ChartWrapper>
                <Chart
                    labels={labels[viewType]}
                    data={priceArr[viewType]}
                    options={chartOptions[viewType]}
                    config={config}
                />
            </S.ChartWrapper>
        </S.Wrapper>
    );
};

YearlyPriceChart.propTypes = {
    priceHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default YearlyPriceChart;
