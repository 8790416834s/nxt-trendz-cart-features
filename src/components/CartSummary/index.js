import './index.css'

const CartSummary = () => (
  <>
    <div className="cart-summary-container">
      <h1 className="total-heading">
        <span className="total-span">Order Total: </span>Rs ----/-
      </h1>
      <span className="span">4 Items in cart</span>
      <button type="button" className="check-out-btn">
        Checkout
      </button>
    </div>
  </>
)
export default CartSummary
