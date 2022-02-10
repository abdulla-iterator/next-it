import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $price: Int
    $description: String
  ) {
    updateProduct(
      id: $id
      data: { name: $name, price: $price, description: $description }
    ) {
      id
      name
      price
      description
    }
  }
`;
function UpdateProduct({ id }) {
  // ? get existing data
  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  // ? update mutation
  const [updateProduct, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_PRODUCT_MUTATION);

  const { values, handleChange, clearForm, resetForm } = useForm(data?.Product);
  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await updateProduct({
      variables: {
        id,
        name: values.name,
        price: values.price,
        description: values.description,
      },
    });
    console.log(res);
    clearForm();
    Router.push({
      pathname: `/products`,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Update Product</h1>
      <DisplayError error={error} />
      <fieldset disabled={loadingUpdate} aria-busy={loadingUpdate}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Name"
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={values.price}
          onChange={handleChange}
          id="price"
          required
          placeholder="Price"
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          id="description"
          placeholder="Description"
        />

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

export default UpdateProduct;
