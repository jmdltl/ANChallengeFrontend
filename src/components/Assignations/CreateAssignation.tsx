import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAccountsApi } from '../../services/api.account';
import { postAssignationApi } from '../../services/api.assignations';
import { getUsersApi } from '../../services/api.users';

function CreateAssignationComponent() {
  const [infoMessage, setInfoMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const usersQuery = useQuery({
    queryKey: ['users', 100, 0],
    queryFn: () => getUsersApi(100, 0),
  });

  const accountsQuery = useQuery({
    queryKey: ['accounts', 100, 0],
    queryFn: () => getAccountsApi(100, 0),
  });

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    ['assignation'],
    {
      mutationFn: postAssignationApi,
      onSuccess: (data, variables, context) => {
        setInfoMessage('Assignation registered');
      },
      onError: ({ response }) => {
        setInfoMessage(response.data.message);
      },
    },
  );

  const onSubmit = async ({
    userId,
    accountId,
  }: {
    userId: number | string;
    accountId: number | string;
  }) => {
    try {
      mutate({
        accountId,
        userId,
      });
    } catch (e) {
      // show alert to user
      console.log(e);
    }
  };

  return (
    <div className="rounded-md bg-gray-700 py-1 px-2 md:px-6">
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          {errors.email && (
            <span className="text-red-600">A valid email is required</span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            User
          </label>
          <select
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register('userId')}
          >
            <option></option>
            {usersQuery?.data?.data?.map((user, i) => (
              <option key={i} value={user.id}>
                {`${user.firstName} ${user.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Account
          </label>
          <select
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register('accountId')}
          >
            <option></option>
            {accountsQuery?.data?.data?.map((account, i) => (
              <option key={`b${i}`} value={account.id}>
                {`${account.name}`}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          {isError ? <p className="text-red-600">{infoMessage}</p> : <></>}
        </div>
        <div className="mb-6">
          {isSuccess ? <p className="text-teal-500">{infoMessage}</p> : <></>}
        </div>

        <div className="mb-6 flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="group relative  rounded-md bg-indigo-600 py-2 px-6 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAssignationComponent;
