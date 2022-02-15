import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { GET_CURRENT_USER } from './User';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

function RequestReset() {
  const { values, handleChange, clearForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: values,
    }
  );

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(values);
    const res = await signup().catch(console.error);
    console.log(res);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Passsword</h2>
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Check your email for a link</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
        />

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
