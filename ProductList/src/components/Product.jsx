function Product({
  name,
  image,
  price,
  description,
  available
}) {

  return (
    <div className="product-card">
      <img
        src={image}
        alt={name}
      />
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>₹{price}</h3>
      {available ? (
        <p className="available">Available</p>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}
      <button disabled={!available}>
        {available ? "Buy Now" : "Not Available"}
      </button>
    </div>
  );
}

export default Product;