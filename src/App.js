import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const updatedQuantity = each.quantity + 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id && each.quantity > 1) {
          if (each.quantity > 1) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          } else if (each.quantity === 0) {
            this.setState({
              cartList: prevState.cartList.filter(
                eachItem => eachItem.id !== id,
              ),
            })
          }
        }
        return each
      }),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    //   TODO: Update the code here to implement addCartItem
    const productObject = cartList.find(each => each.id === product.id)
    console.log(productObject)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === productObject.id) {
            const updatedQuantity = each.quantity + product.quantity
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
