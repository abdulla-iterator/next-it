/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { useCombobox, resetIdCounter } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { SearchStyles, DropDownItem, DropDown } from '../styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    allProducts( #rename with searchTerm
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
function Search() {
  const [findItems, { data, loading }] = useLazyQuery(
    // FIXME:

    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache', // bypass cache
    }
  );
  console.log(`DATA: ${data}`);
  const items = data?.allProducts || [];
  console.log(typeof items);
  console.info(`ITEMS: ${items}`);
  const findItemsButChill = debounce(findItems, 400);
  resetIdCounter();
  const {
    getInputProps,
    getMenuProps,
    getItemProps,
    getComboboxProps,
    isOpen,
    inputValue,
    selectedItem,
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log('input value changed');
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange() {
      console.log('item changed');
    },
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            placeholder: 'search for a product',
            type: 'search',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {items.map((item) => (
          <DropDownItem>{item.name}</DropDownItem>
        ))}
      </DropDown>
    </SearchStyles>
  );
}

export default Search;
