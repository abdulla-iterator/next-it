/* eslint-disable react/prop-types */
import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import { useCart } from '../lib/cartState';
import formatMoney from '../lib/formatMoney';
import calTotalPrice from '../lib/calTotalPrice';
import CloseButton from './styles/CloseButton';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightgrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
    width: 100px;
  }
  h3,
  p {
    margin: 0;
  }
`;
function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>{formatMoney(product.price * cartItem.quantity)}-</p>
        <em>
          {cartItem.quantity} X {formatMoney(product.price)}
        </em>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();
  console.log(`CART: ${user}`);
  if (!user) return null;
  return (
    <CartStyles open={cartOpen}>
      <h2>Your Cart</h2>
      <CloseButton onClick={closeCart}>&times;</CloseButton>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <h3> Total Billing Amount: {formatMoney(calTotalPrice(user.cart))}</h3>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
