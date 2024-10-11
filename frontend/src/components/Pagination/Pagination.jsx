import { useEffect } from "react";
import PropTypes from "prop-types";
import {
    PaginationContainer,
    PageButton,
    PageButton2,
} from "./Pagination.styled";
import {
    FaAngleRight,
    FaAngleLeft,
    FaAnglesLeft,
    FaAnglesRight,
} from "react-icons/fa6";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
    useEffect(() => {}, [currentPage, pageCount]);

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange({ selected: page });
        }
    };

    const handleFirstPage = () => {
        onPageChange({ selected: 0 });
    };

    const handleLastPage = () => {
        onPageChange({ selected: pageCount - 1 });
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            onPageChange({ selected: currentPage - 1 });
        }
    };

    const handleNextPage = () => {
        if (currentPage < pageCount - 1) {
            onPageChange({ selected: currentPage + 1 });
        }
    };

    const renderPageButtons = () => {
        const buttons = [];

        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(pageCount - 1, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <PageButton
                    key={i}
                    onClick={() => handlePageClick(i)}
                    disabled={currentPage === i}
                    $active={currentPage === i}
                >
                    {i + 1}
                </PageButton>,
            );
        }

        return buttons;
    };

    return (
        <PaginationContainer>
            <PageButton2 onClick={handleFirstPage} disabled={currentPage === 0}>
                <FaAnglesLeft />
            </PageButton2>
            <PageButton2 onClick={handlePrevPage} disabled={currentPage === 0}>
                <FaAngleLeft />
            </PageButton2>
            {renderPageButtons()}
            <PageButton2
                onClick={handleNextPage}
                disabled={currentPage === pageCount - 1}
            >
                <FaAngleRight />
            </PageButton2>
            <PageButton2
                onClick={handleLastPage}
                disabled={currentPage === pageCount - 1}
            >
                <FaAnglesRight />
            </PageButton2>
        </PaginationContainer>
    );
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;
