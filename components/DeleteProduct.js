import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
function updateCache(cache, payload) {
  console.log(payload);
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT, {
    variables: { id },
    update: updateCache,
  });

  return (
    <button
      disabled={loading}
      onClick={() => {
        if (confirm('want to delete this item?')) {
          deleteProduct();
        }
      }}
    >
      Delete
    </button>
  );
}
