import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;
export function useUser() {
  const { data } = useQuery(GET_CURRENT_USER);
  return data?.authenticateItem;
}
