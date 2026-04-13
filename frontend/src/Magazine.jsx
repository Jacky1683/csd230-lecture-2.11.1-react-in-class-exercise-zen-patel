import { useCart } from './CartContext';

function Magazine({ id, title, price, copies, orderQty, currentIssue, onDelete }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
      productType: 'Magazine',
    });
  };

  return (
    <div className="inventory-card">
      <div className="inventory-header">
        <h3>{title}</h3>
        <span className="inventory-badge">Magazine</span>
      </div>

      <div className="inventory-details">
        <p><strong>Price:</strong> ${Number(price || 0).toFixed(2)}</p>
        <p><strong>Copies:</strong> {copies}</p>
        <p><strong>Order Quantity:</strong> {orderQty}</p>
        <p><strong>Current Issue:</strong> {currentIssue || 'N/A'}</p>
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

export default Magazine;