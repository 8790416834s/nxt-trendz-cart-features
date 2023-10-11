import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartListCount = cartList.length
      const sumPrice = cartList.map(each => each.price * each.quantity)
      const updatedPrice = sumPrice.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      )

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="total-heading">
              <span className="total-span">Order Total: </span>Rs
              {updatedPrice}/-
            </h1>
            <p className="span">{cartListCount} Items in cart</p>
            <button type="button" className="check-out-btn">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
