import { useState } from "react";
import useInfiniteScroll from "./hooks/useInfiniteScroll"; 
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

const App = () => {
  const { products, loadMore, loading, hasMore } = useInfiniteScroll();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedProducts = products.slice(0, currentPage * 20);

  return (
    <div className="app">
      <h1>Product List</h1>
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
      {!hasMore && (
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default App;