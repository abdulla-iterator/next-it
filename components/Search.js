/* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/jsx-props-no-spreading */
// import { useLazyQuery } from '@apollo/client';
// import { useCombobox, resetIdCounter } from 'downshift';
// import gql from 'graphql-tag';
// import debounce from 'lodash.debounce';
// // import debounce from 'debounce';
// import { useRouter } from 'next/dist/client/router';
// import { SearchStyles, DropDownItem, DropDown } from './styles/DropDown';

// const SEARCH_PRODUCTS_QUERY = gql`
//   query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
//     allProducts( #rename with searchTerm
//       where: {
//         OR: [
//           { name_contains_i: $searchTerm }
//           { description_contains_i: $searchTerm }
//         ]
//       }
//     ) {
//       id
//       name
//       photo {
//         image {
//           publicUrlTransformed
//         }
//       }
//     }
//   }
// `;
// // function debounce(func, timeout = 400) {
// //   let timer;
// //   return (...args) => {
// //     clearTimeout(timer);
// //     timer = setTimeout(() => {
// //       func.apply(this, args);
// //     }, timeout);
// //   };
// // }

// function Search() {
//   const router = useRouter();
//   const [findItems, { data, loading }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
//     fetchPolicy: 'no-cache', // bypass cache
//   });
//   const items = data?.allProducts || [];
//   // const findItemsButChill = debounce(findItems, 400);
//   console.log(typeof items);
//   console.info(`ITEMS: ${items}`);
//   // FIXME:
//   const findItemsButChill = debounce(() => findItems());
//   resetIdCounter();
//   const {
//     getInputProps,
//     getMenuProps,
//     getItemProps,
//     getComboboxProps,
//     isOpen,
//     inputValue,
//   } = useCombobox({
//     items,
//     onInputValueChange() {
//       // console.log('input value changed');
//       findItems({
//         variables: {
//           searchTerm: inputValue,
//         },
//       });
//     },
//     onSelectedItemChange({ selectedItem }) {
//       // console.log('item changed');
//       router.push({
//         pathname: `/product/${selectedItem.id}`,
//       });
//     },
//     itemToString: (item) => item?.name || '',
//   });
//   return (
//     <SearchStyles>
//       <div {...getComboboxProps()}>
//         <input
//           {...getInputProps({
//             placeholder: 'search for a product',
//             type: 'search',
//             id: 'search',
//             className: loading ? 'loading' : '',
//           })}
//         />
//         <button
//           type="button"
//           onClick={() =>
//             findItemsButChill({
//               variables: {
//                 searchTerm: inputValue,
//               },
//             })
//           }
//         >
//           Search
//         </button>
//       </div>
//       <DropDown {...getMenuProps()}>
//         {isOpen &&
//           items.map((item, index, highlightedIndex) => (
//             <DropDownItem
//               {...getItemProps({ item, index })}
//               key={item.id}
//               highlighted={index === highlightedIndex}
//             >
//               <img
//                 src={item.photo.image.publicUrlTransformed}
//                 alt={item.name}
//                 width="50"
//               />
//               <p>{item.name}</p>
//             </DropDownItem>
//           ))}
//         {isOpen && !items.length && !loading && (
//           <DropDownItem>No product found </DropDownItem>
//         )}
//       </DropDown>
//     </SearchStyles>
//   );
// }

// export default Search;

//= =
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
// import { DropDown } from '../styles/DropDown'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
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

export default function Search() {
  const router = useRouter();

  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  console.log(data);
  console.log(`ERROR:${error}`);
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 500);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
