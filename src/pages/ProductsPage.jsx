import { useEffect, useState } from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProductContext";
import styles from "./ProductsPage.module.css";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

function ProductsPage() {
  const products = useProducts();

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    // نشان دادن مقدار اینپوت سرچ در یو ای
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
