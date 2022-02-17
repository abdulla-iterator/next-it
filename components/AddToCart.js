/* eslint-disable react/display-name */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { GET_CURRENT_USER } from './User';

const ADD_TO_CART = gql`
  mutation ADD_TO_CART($id: ID) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function ({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    variables: { id },
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });
  return (
    <button type="button" onClick={addToCart} disabled={loading}>
      Add {loading && 'ing'} to Cart
    </button>
  );
}
