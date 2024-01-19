import { Column } from "react-table";
import TableHOC from "./TableHOC";

import { useMemo } from "react";

interface ProductTableTypes {
  id: number;
  stock: number;
  title: string;
  brand: string;
  rating: number;
  price: number;
  category: string;
}

const ProductsTable = ({ data = [] }: { data: ProductTableTypes[] }) => {
  const columns: Column<ProductTableTypes>[] = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Product name",
        accessor: "title",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },

      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
    ],
    []
  );

  return TableHOC<ProductTableTypes>(columns, data, "productsBox", "")();
};

export default ProductsTable;

