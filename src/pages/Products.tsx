import React, { useCallback, useEffect, useState } from "react";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import TableSkeleton from "../components/TableSkeleton";
import DropDownMultiSelect from "../components/DropDownMultiSelect";

const data = [
  {
    id: 1,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 2,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 3,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 4,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 5,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 5,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 6,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 7,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 8,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 9,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
  {
    id: 10,
    title: "nike shoes",
    category: "shoes",
    price: 123,
    quantity: 1,
    brand: "Nike",
    rating: 4.5,
  },
];

interface ProductData {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  rating: number;
}

const Products = () => {
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data?.products);
      setProductsData(data?.products);
      setTotal(data?.total);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productUrl = `https://dummyjson.com/products?limit=10&skip=${
      currentPage * 10 - 10
    }`;
    fetchProducts(productUrl);
  }, [currentPage]);

  useEffect(() => {
    if (query.length > 1) {
      const searchUrl = `https://dummyjson.com/products/search?q=${query}`;
      fetchProducts(searchUrl);
    } else {
      const defaultUrl = `https://dummyjson.com/products?limit=10&skip=${
        currentPage * 10 - 10
      }`;
      fetchProducts(defaultUrl);
    }
  }, [query, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="">
      <div className="w-full md: w-1/4">
        <div className=" flex gap-4 items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              value={query}
              onChange={(event) => setQuery(event?.target?.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
              required
            />
          </div>
          <DropDownMultiSelect />
        </div>
      </div>

      {!loading ? (
        <>
          <ProductsTable data={productsData} />
          <Pagination
            totalItems={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <TableSkeleton columnsCount={6} rowCount={10} />
      )}
    </div>
  );
};

export default Products;
