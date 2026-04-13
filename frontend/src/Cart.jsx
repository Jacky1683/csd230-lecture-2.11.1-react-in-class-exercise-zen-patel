import { useCart } from './CartContext';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  return (
    <div className="form-page">
      <div className="form-card cart-card-wide">
        <p className="section-label">Shopping Cart</p>
        <h1>Your Cart</h1>
        <p className="section-subtitle">
          Review selected products, update quantities, or remove items.
        </p>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div
                  key={`${item.productType}-${item.id}`}
                  className="cart-item"
                >
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>{item.productType}</p>
                    <p>Unit Price: ${Number(item.price || 0).toFixed(2)}</p>
                  </div>

                  <div className="cart-actions">
                    <div className="qty-controls">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.id, item.productType)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.id, item.productType)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-subtotal">
                      Subtotal: $
                      {(Number(item.price || 0) * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="danger-btn"
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id, item.productType)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total: ${cartTotal.toFixed(2)}</h2>

              <div className="cart-summary-actions">
                <button className="secondary-btn" type="button" onClick={clearCart}>
                  Clear Cart
                </button>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => alert('Checkout feature coming soon!')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;