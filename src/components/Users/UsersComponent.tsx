import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUsersApi } from '../../services/api.users';

function UsersComponent() {
  const [take, setTake] = useState(100);
  const [skip, setSkip] = useState(0);

  const { isLoading, error, data } = useQuery({
    queryKey: ['users', take, skip],
    queryFn: () => getUsersApi(take, skip),
  });

  if (isLoading) return <>'Loading...'</>;

  if (error) return <>'An error has occurred'</>;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="flex-initial text-xl text-red-600 ">Users</h1>
        <NavLink to={'/users/create'}>
          <button className="flex-initial rounded-md bg-gray-600 px-4 py-1 text-white">
            Create User
          </button>
        </NavLink>
      </div>
      <div className="-mx-1 flex flex-wrap lg:-mx-4">
        {data.data.map((user) => {
          return (
            <div
              className="my-2 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4"
              key={user.id}
            >
              <NavLink to={`/users/${user.id}`}>
                <article className="overflow-hidden rounded-lg border-2 border-gray-300 pb-2 shadow-xl hover:shadow-2xl">
                  <header className="flex items-center justify-between p-2 leading-tight md:p-4">
                    <h1 className="text-lg">
                      <p className="text-black no-underline hover:underline">
                        Email: {user.email}
                      </p>
                    </h1>
                  </header>

                  <div className="w-full">
                    <table className="w-full table-auto p-2">
                      <tbody>
                        <tr>
                          <td className="px-2 py-1">ID:</td>
                          <td className="px-2 py-1">{user.id}</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1">First Name:</td>
                          <td className="px-2 py-1">{user.firstName}</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1">Last Name:</td>
                          <td className="px-2 py-1">{user.lastName}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UsersComponent;
