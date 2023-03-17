import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function UsersComponent() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('http://localhost:3000/v0.1/test').then((res) => res.data),
  });

  if (isLoading) return <>'Loading...'</>;

  if (error) return <>'An error has occurred'</>;

  return <h1>Users Component {data}</h1>;
}

export default UsersComponent;
