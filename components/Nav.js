import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

function Nav() {
  const user = useUser();
  console.log(`NAVIGATION: ${user}`);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
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
