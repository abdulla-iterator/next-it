import { gql, useLazyQuery } from '@apollo/client';

const SEARCH = gql`
  query {
    allProducts(
      where: {
        OR: [{ name_contains_i: "yeti" }, { description_contains_i: "yeti" }]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Hello() {
  const [fetchItems, { called, loading, data }] = useLazyQuery(SEARCH, {
    fetchPolicy: 'network-only', // bypass cache
  });
  const items = data?.allProducts || [];
  //   console.log(typeof items);
  console.info(`ITEMS: ${items}`);
  if (loading) return <p>Loading ...</p>;
  if (!called) {
    return <button onClick={() => fetchItems()}>Load </button>;
  }
  return (
    <div>
      <p>{data?.allProducts?.length}</p>
      {data?.allProducts?.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
        </div>
      ))}
    </div>
  );
}
