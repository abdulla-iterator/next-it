import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

// Styled Components
const Logo = styled.h1`
  font-size: 3rem;
  background: brown;
  z-index: 2;
  position: relative;
  margin-left: 2rem;
  margin-right: 2rem;
  a {
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
  }
`;
const StyledHeader = styled.header`
  .bar {
    border-bottom: 5px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;
function Header() {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/"> Store</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
        <Cart />
      </div>
    </StyledHeader>
  );
}
export default Header;
