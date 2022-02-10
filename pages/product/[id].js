import SingleProduct from '../../components/SingleProduct';

function SingleProductPage({ query }) {
  //   console.log({ data, loading, error });
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;

  return <SingleProduct id={query.id} />;
}

export default SingleProductPage;
