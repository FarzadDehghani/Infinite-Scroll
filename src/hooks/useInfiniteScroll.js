import { useState, useEffect } from "react";
import { generateProducts } from "../api/products";

const useInfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadMoreProducts = async () => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      const newProducts = await generateProducts(page);
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
      if (page >= 10) setHasMore(false);
    };

    loadMoreProducts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { products, isLoading, hasMore };
};

export default useInfiniteScroll;