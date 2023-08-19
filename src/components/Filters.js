import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const { filters, updateFilters, clearFilters,filteredProducts,allProducts } =
    useFilterContext();
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
  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <div className="content">
        <div className="content">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* search input */}
            <div className="form-control">
              <input
                type="text"
                name="text"
                placeholder="search"
                className="search-input"
                value={text}
                onChange={updateFilters}
              />
            </div>
            {/* category */}
            <div className="form-control">
              <h5>categories</h5>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name="category"
                    className={`${category == c ? "active" : null}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            {/* companies */}
            <div className="form-control">
              <h5>companies</h5>
              <select
                name="company"
                className="company"
                onChange={updateFilters}
                value={company}
              >
                {companies.map((c, index) => {
                  return (
                    <option value={c} key={index}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* colors */}
            <div className="form-control">
              <h5>colors</h5>

              <div className="colors">
                {colors.map((c, index) => {
                  if (c == "all")
                    return (
                      <button
                        className={`${
                          color == "all" ? "all-btn active" : "all-btn"
                        }`}
                        onClick={updateFilters}
                        name="color"
                        data-color="all"
                      >
                        all
                      </button>
                    );

                  return (
                    <button
                      className={`${
                        color == c ? "color-btn active" : "color-btn"
                      }`}
                      onClick={updateFilters}
                      name="color"
                      key={index}
                      style={{ background: c }}
                      data-color={c}
                    >
                      {color == c ? <FaCheck /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* price range */}
            <div className="form-control">
              <h5>price</h5>
              <p className="price">{formatPrice(price)}</p>
              <input
                type="range"
                name="price"
                onChange={updateFilters}
                value={price}
                min={minPrice}
                max={maxPrice}
              />
            </div>
            {/* shipping */}
            <div className="form-control shipping">
              <label htmlFor="">free shipping</label>
              <input
                type="checkbox"
                name="shipping"
                onChange={updateFilters}
                checked={shipping}
              />
            </div>
            <button className="clear-btn" onClick={clearFilters}>
              clear filters
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
