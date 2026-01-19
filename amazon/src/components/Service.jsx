import { useEffect, useState, useRef } from "react";

const LIMIT = 8;

function Service() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

 useEffect(() => {
  fetch("/data.json")
    .then(res => res.json())
    .then(data => {
      const uniqueCategories = [
        ...new Map(
          data.products.map(p => [
            p.category,
            { slug: p.category, name: p.category }
          ])
        ).values()
      ];
      setCategories(uniqueCategories);
    });
}, []);


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);


  const fetchProducts = () => {
  setLoading(true);

  fetch("/data.json")
    .then(res => res.json())
    .then(data => {
      let filteredProducts =
        selectedCategory === "all"
          ? data.products
          : data.products.filter(
              p => p.category === selectedCategory
            );

      const paginatedProducts = filteredProducts.slice(
        skip,
        skip + LIMIT
      );

      setProducts(prev => [...prev, ...paginatedProducts]);

      if (skip + LIMIT >= filteredProducts.length) {
        setHasMore(false);
      }

      setLoading(false);
    })
    .catch(() => setLoading(false));
};
  
    const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (cart[product.id]) {
      if (cart[product.id].quantity >= 10) {
        alert("Maximum quantity for this product is 10");
        return;
      }
      cart[product.id].quantity += 1;
    } else {
      cart[product.id] = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // alert("Added to cart");
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (skip !== 0) fetchProducts();
  }, [skip]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setSkip(prev => prev + LIMIT);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Products</h1>

      <div className="mb-4 text-center">
        <select
          className="form-select w-50 mx-auto"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, index) => (
            <option value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* {carts.map(cart => (
        <div key={cart.id} className="mb-5">
          <h4 className="mb-3">Cart #{cart.id}</h4> */}

          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card h-100" style={{ width: "18rem" }}>
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "180px", objectFit: "contain" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      Price: ₹ {product.price}
                    </p>
                    <p className="card-text">
                      Min Order Qty: {product.minimumOrderQuantity}
                    </p>
                    <p className="card-text text-success fw-bold">
                      Discount: {product.discountPercentage} %
                    </p>
                    <a href="#" className="btn btn-primary w-100" onClick={() => addToCart(product)}>
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
      {loading && <p className="text-center">Loading...</p>}

      {/* Trigger for infinite scroll */}
      <div ref={loaderRef}></div>

      {!hasMore && (
        <p className="text-center text-muted">No more products</p>
      )}
    </div>
  );
}

export default Service;
