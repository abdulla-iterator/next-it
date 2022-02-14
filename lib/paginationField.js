import { PAGINATION_QUERY } from '../components/Pagination';

function paginationField() {
  return {
    keyArgs: false, // tells apollo to not use the key as an argument
    read(existing = [], { args, cache }) {
      console.log(existing);

      const { skip, first } = args;
      // read the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // check existing items
      const items = existing.slice(skip, skip + first).filter((item) => item);
      // last page has less than perpage items
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false; // no items, go to the server to fetch the data
      }
      if (items.length) {
        console.log(`paginationField: items.length: ${items.length}`);
        return items;
      }
      return false; // fallback to the server
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      //   const merged = [...existing, ...incoming];
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}

export default paginationField;
