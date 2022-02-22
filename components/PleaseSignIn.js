import { useUser } from './User';
import Signin from './Signin';

export default function ({ children }) {
  const user = useUser();
  return user ? children : <Signin />;
}
