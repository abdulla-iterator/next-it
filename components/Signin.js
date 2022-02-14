import Form from './styles/Form';
import useForm from '../lib/useForm';

function Signin() {
  const { values, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    clearForm();
  };
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Account</h2>
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
