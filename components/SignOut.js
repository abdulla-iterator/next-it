import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
}
