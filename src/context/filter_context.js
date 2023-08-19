import React, { useEffect, useContext, useState } from "react";

import { useProductsContext } from "./products_context";
const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { Products } = useProductsContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [sortValue, setSortValue] = useState("price-lowest");

  const maxInitialPrice = Math.max(...Products.map((product) => product.price));
  const [filters, setFilters] = useState({
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice:0,
    price: 0,
    shipping: false,
  });

  const loadProducts = (products) => {
    setAllProducts(products);
    setFilteredProducts(products);
    const max = Math.max(...products.map((product) => product.price));

    setFilters((prevFilters) => ({
      ...prevFilters,
      maxPrice: max,
      price:max
    }));
  };

  const gridViewSetup = () => {
    setGridView(true);
  };
  const listViewSetup = () => {
    setGridView(false);
  };

  const updateSort = (e) => {
    const value = e.target.value;
    setSortValue(value);
  };

  const sortProducts = () => {
    let tempProducts = [...filteredProducts];

    if (sortValue == "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      });
    }
    if (sortValue == "price-highest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) return 1;
        if (a.price > b.price) return -1;
        return 0;
      });
    }
    if (sortValue == "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sortValue == "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return tempProducts;
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "category") {
      value = e.target.textContent;
    }
    if (name == "color") {
      value = e.target.dataset.color;
    }
    if (name == "shipping") {
      value = e.target.checked;
    }
    if (name == "price") {
      value = Number(value);
    }
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      ...filters,
      text: "",
      company: "all",
      category: "all",
      color: "all",
      price: filters.maxPrice,
      shipping: false,
    });
  };

  const filterProducts = () => {
    //making temp arr
    let tempProducts = [...Products];
    //destructuring elements of filters
    const {
      text,
      company,
      category,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    } = filters;
    //filtering
    //text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().includes(text);
      });
    }
    //category
    if (category != "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category == category
      );
    }

    //company
    if (company != "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company == company
      );
    }

    //colors
    if (color != "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.includes(color);
      });
    }

    //price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping == true);
    }
    return tempProducts;
  };

  useEffect(() => {
    loadProducts(Products);
  }, [Products]);

  useEffect(() => {
    const sortedProducts = sortProducts();
    setFilteredProducts(sortedProducts);
  }, [sortValue]);
  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filteredProducts,
        allProducts,
        gridView,
        gridViewSetup,
        listViewSetup,
        updateSort,
        sortValue,
        filters,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
