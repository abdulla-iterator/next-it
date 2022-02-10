import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';

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
export default function SingleProduct({ id }) {
  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  //   const { Product } = data;
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  const ProductStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    min-height: 100vh;
    max-width: var(--maxWidth);
    justify-items: center;
    align-items: top;
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  `;
  return (
    <ProductStyles>
      <Head>
        <title>Store{data.Product.name}</title>
      </Head>
      <img
        src={data.Product.photo.image.publicUrlTransformed}
        alt={data.Product.name}
      />
      <div className="details">
        <h1>{data.Product.name}</h1>
        <p>{data.Product.description}</p>
        <p>{data.Product.price}</p>
      </div>
    </ProductStyles>
  );
}
