import React from "react";

interface TableSkeletonProps {
  columnsCount: number;
  rowCount: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columnsCount,
  rowCount,
}) => {
  const skeletonRows = Array.from({ length: rowCount }, (_, index) => (
    <tr className="px-4" key={index}>
      {Array.from({ length: columnsCount }, (col, colIndex) => (
        <td key={colIndex} className=" px-1 py-3 w-1/4">
          <div role="status" className="animate-pulse">
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700"></div>
          </div>
        </td>
      ))}
    </tr>
  ));

  return <tbody className="bg-gray-900">{skeletonRows}</tbody>;
};

export default TableSkeleton;
