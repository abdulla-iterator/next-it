import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { GET_CURRENT_USER } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

function SignUp() {
  const { values, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: values,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(values);
    const res = await signup().catch(console.error);
    console.log(res);
  }
  //   if (data?.createUser) {
  //     return <h3>Successfully Sign Up with {data.createUser.email}</h3>;
  //   }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Create New Account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Successfully Sign Up with {data.createUser.email}</p>
        )}
        <label htmlFor="name">Name</label>
        <input
          type="name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
        />
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
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}

export default SignUp;
