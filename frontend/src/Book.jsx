import { useCart } from './CartContext';

function Book({ id, title, author, copies, price, onDelete }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
      productType: 'Book',
    });
  };

  return (
    <div className="inventory-card">
      <div className="inventory-header">
        <h3>{title}</h3>
        <span className="inventory-badge">Book</span>
      </div>

      <div className="inventory-details">
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Copies:</strong> {copies}</p>
        <p><strong>Price:</strong> ${Number(price || 0).toFixed(2)}</p>
      </div>

      <div className="inventory-actions">
        <button className="primary-btn small-btn" type="button" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {onDelete && (
          <button
            className="danger-btn"
            type="button"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Book;