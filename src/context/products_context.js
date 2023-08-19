import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { products_url as url } from "../utils/constants";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [singleProduct, setSingleProducts] = useState([]);
  const [isSingleLoading, setIsSingleLoading] = useState(false);
  const [isSingleError, setIsSingleError] = useState(false);
  const openSidebar = () => {
    setisSidebarOpen(true);
  };
  const closeSidebar = () => {
    setisSidebarOpen(false);
  };

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const products = response.data;
      setIsLoading(false);
      setProducts(products);
      setFeaturedProducts(
        products.filter((product) => product.featured === true)
      );
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  const fetchSingleProduct = async (url) => {
    setIsSingleLoading(true);
    try {
      const response = await axios.get(url);
      const products = response.data;
      setIsSingleLoading(false);
      setSingleProducts(products);
    } catch (error) {
      setIsSingleLoading(false);
      setIsSingleError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isError,
        isLoading,
        featuredProducts,
        fetchSingleProduct,
        isSingleLoading,
        isSingleError,
        singleProduct,
        Products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
