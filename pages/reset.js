import Reset from '../components/Reset';

function ResetPage({ query }) {
  if (!query?.token) {
    return <div>Invalid token </div>;
  }
  return (
    <div>
      <h1>Reset Password {query.token}</h1>
      <Reset token={query.token} />
    </div>
  );
}

export default ResetPage;
