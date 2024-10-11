import { useMemo } from "react";
import PriceDifferenceCell from "./Cell/PriceDifferenceCell";
import ImageCell from "./Cell/ImageCell";

export const useIngredientPriceColumns = () => {
    return useMemo(
        () => [
            {
                Header: "날짜",
                accessor: "date",
            },
            {
                Header: "가격(원/kg)",
                accessor: "price",
            },
            {
                Header: "전일 대비",
                accessor: "priceDifference",
                Cell: PriceDifferenceCell,
            },
        ],
        [],
    );
};

export const useIngredientColumn = () => {
    return useMemo(
        () => [
            {
                Header: "",
                accessor: "img",
                Cell: ImageCell,
            },
            {
                Header: "이름",
                accessor: "name",
            },
            {
                Header: "가격",
                accessor: "price",
            },
        ],
        [],
    );
};
