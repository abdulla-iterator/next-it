import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { GET_CURRENT_USER } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

function Signin() {
  const { values, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: values,
    // refetch the current user after signin
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });
  // console.log(`SINGIN_MUTATION: ${error}`);
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(values);
    const res = await signin();
    console.log(res);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Account</h2>
      <Error error={error} />
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Secret password"
          autoComplete="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}

export default Signin;
