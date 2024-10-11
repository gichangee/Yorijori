import PropTypes from "prop-types";
import { useTable } from "react-table";
import * as S from "./Table.styled";
import { useState } from "react";

const Table = ({ columns, data: initialData, onClick }) => {
    const [data, setData] = useState(initialData);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    const handleRemoveRow = (rowIdx) => {
        const newData = data.filter((_, index) => index !== rowIdx);
        setData(newData);
    };
    return (
        <S.TableSheet {...getTableProps()}>
            <S.TableHead>
                {headerGroups.map((headerGroup, i) => (
                    <S.Header key={i} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, j) => (
                            <S.Th key={j} {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </S.Th>
                        ))}
                    </S.Header>
                ))}
            </S.TableHead>
            <S.Tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <S.Tr
                            onClick={() => onClick(rowIndex)}
                            key={rowIndex}
                            {...row.getRowProps()}
                        >
                            {row.cells.map((cell, cellIndex) => (
                                <S.Td key={cellIndex} {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </S.Td>
                            ))}
                            <S.RemoveTd
                                onClick={() => handleRemoveRow(rowIndex)}
                            >
                                X
                            </S.RemoveTd>
                        </S.Tr>
                    );
                })}
            </S.Tbody>
        </S.TableSheet>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func,
    cell: PropTypes.shape({
        value: PropTypes.any,
    }),
};

export default Table;
