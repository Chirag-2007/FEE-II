import { useState } from "react";
import Product from "./components/Product";
import "./Product.css";

function App() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const products = [
    {
      id: 1,
      name: "Nike Shoes",
      category: "shoes",
      price: 3000,
      description: "Good running shoes",
      available: true,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSO2Y-chf3F5UR_LxTbRIthEPzqbtp6XaEViNOIS1JrvJa0e5MIl34-HQK1145NMTfDW71ZgUqpPgPWDb3BdlTEOhy8Jyuc"
    },
    {
      id: 2,
      name: "Dell Laptop",
      category: "laptop",
      price: 70000,
      description: "Powerful laptop",
      available: true,
      image: "https://5.imimg.com/data5/DS/EU/MY-38697753/dell-laptops.jpeg"
    },
    {
      id: 3,
      name: "iPhone",
      category: "phone",
      price: 80000,
      description: "Latest Apple smartphone",
      available: false,
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/apple/494423016/0/IhIWUjyhz5-ArtMl5eQyu-Apple-iPhone-16-494423016-i-1-1200Wx1200H.jpeg"
    },
    {
      id: 4,
      name: "Samsung Galaxy",
      category: "phone",
      price: 90000,
      description: "Latest Samsung smartphone",
      available: true,
      image: "https://vlebazaar.in/image/cache/catalog/Samsung-Galaxy-S24-Ultra-5G-AI-Smartphone-Titanium-Gray-12GB-256GB-Stora/Samsung-Galaxy-S24-Ultra-5G-AI-Smartphone-Titanium-Gray-12GB-256GB-Storage-S928B-1500x1500.jpg"
    },
    {
      id: 5,
      name: "Adidas Shoes",
      category: "shoes",
      price: 4000,
      description: "Comfortable sports shoes",
      available: true,
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/adidas_shoes.jpg"
    },
    {
      id: 6,
      name: "HP Laptop",
      category: "laptop",
      price: 65000,
      description: "Fast and reliable laptop",
      available: true,
      image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08901980.png"
    },
    {
      id: 7,
      name: "OnePlus 13",
      category: "phone",
      price: 65000,
      description: "Powerful Android smartphone",
      available: true,
      image: "https://image01.oneplus.net/ebp/202501/13/1-m00-2f-1b-rb8bwpq.jpg"
    },
    {
      id: 8,
      name: "Sony Headphones",
      category: "headphones",
      price: 12000,
      description: "Noise cancelling headphones",
      available: true,
      image: "https://electronics.sony.com/image/sony-headphones.jpg"
    }
  ];

  const categories = [
    "all",
    "shoes",
    "laptop",
    "phone",
    "headphones"
  ];

  const filteredProducts = products.filter((product) => {

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "all" ||
      product.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <h1>Product Store</h1>

      {/* Search */}

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="categories">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() => setCategory(item)}
          >
            {item === "all" ? "All Products" : item}
          </button>

        ))}

      </div>


      <h2>
        {filteredProducts.length} Products Found
      </h2>

      <div className="products">

        {filteredProducts.map((product) => (

          <Product
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            description={product.description}
            available={product.available}
          />

        ))}

      </div>

      {filteredProducts.length === 0 && (
        <h2>No Products Found</h2>
      )}

    </div>
  );
}

export default App;