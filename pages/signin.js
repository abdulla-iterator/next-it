import styled from 'styled-components';
import Signin from '../components/Signin';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  max-width: 700px;
  margin: 0 auto;
`;
function SignInPage() {
  return (
    <Grid>
      <Signin />
      <SignUp />
      <RequestReset />
    </Grid>
  );
}

export default SignInPage;
