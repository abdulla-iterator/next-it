import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PPODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # variables passed to the mutation
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
      status
    }
  }
`;

function CreateProduct() {
  const { values, handleChange, clearForm, resetForm } = useForm({
    name: 'test',
    image: '',
    price: 23221,
    description: 'des',
  });
  //
  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: values,
      refetchQueries: [{ query: ALL_PPODUCTS_QUERY }], // refetching the queriy after mutation
    }
  );

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createProduct();
    console.log(res);
    clearForm();
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Product</h1>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Name"
        />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          required
          name="image"
          onChange={handleChange}
          id="image"
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

        <button type="submit">Add Product</button>
        <button type="button" onClick={clearForm}>
          Clear
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
