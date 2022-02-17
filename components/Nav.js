import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  console.log(`NAVIGATION: ${user}`);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={openCart}>
            Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </NavStyles>
  );
}
export default Nav;
