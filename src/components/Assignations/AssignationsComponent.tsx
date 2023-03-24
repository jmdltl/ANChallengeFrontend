import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import {
  getAssignationsApi,
  patchAssignationApi,
} from '../../services/api.assignations';

const useGetAssignations = (
  take: number,
  skip: number,
  filters: {
    userName?: string;
    accountName?: string;
    minStartDate?: string;
    maxEndDate?: string;
    sortBy?: string;
    sortOrder?: string;
  },
) => {
  return useQuery({
    queryKey: ['assignations', take, skip, filters],
    queryFn: () => getAssignationsApi(take, skip, filters),
  });
};

function AssignationsComponent() {
  const queryClient = useQueryClient();
  const [infoMessage, setInfoMessage] = useState('');
  const [take, setTake] = useState(100);
  const [skip, setSkip] = useState(0);

  const sortByOptions = ['userName', 'accountName', 'startDate', 'endDate'];
  const sortOrderOptions = ['asc', 'desc'];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [filter, setFilters] = useState({
    userName: '',
    accountName: '',
    minStartDate: '',
    maxEndDate: '',
    sortBy: '',
    sortOrder: '',
  });

  const { isLoading, error, data, refetch } = useGetAssignations(
    take,
    skip,
    filter,
  );

  const assignationMutation = useMutation(['assignations'], {
    mutationFn: patchAssignationApi,
    onSuccess: (data, variables, context) => {
      setInfoMessage('Assignation registered');
      queryClient.refetchQueries(['assignations']);
    },
    onError: ({ response }) => {
      setInfoMessage(response.data.message);
    },
  });

  const mutateOnClick = (id: number | string) => {
    assignationMutation.mutate({ id });
  };

  const filterRefetch = async ({
    userName,
    accountName,
    minStartDate,
    maxEndDate,
    sortBy,
    sortOrder,
  }: {
    userName?: string;
    accountName?: string;
    minStartDate?: string;
    maxEndDate?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    setFilters({
      userName,
      accountName,
      minStartDate,
      maxEndDate,
      sortBy,
      sortOrder,
    });
  };

  if (isLoading) return <>'Loading...'</>;

  if (error) return <>'An error has occurred'</>;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="flex-initial text-xl text-red-600 ">Assignations</h1>
        <NavLink to={'/assignations/create'}>
          <button className="flex-initial rounded-md bg-gray-600 px-4 py-1 text-white">
            Create Assignation
          </button>
        </NavLink>
      </div>
      <div className="flex w-full">
        <form
          className="flex w-full flex-wrap"
          onSubmit={handleSubmit(filterRefetch)}
        >
          <div className="m-1">
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              User Name
            </label>
            <input
              type="text"
              {...register('userName', { required: false })}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="m-1">
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Account Name
            </label>
            <input
              type="text"
              {...register('accountName', { required: false })}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="m-1">
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Min Date
            </label>
            <input
              type="date"
              {...register('minStartDate', {
                required: false,
              })}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="m-1">
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Max Date
            </label>
            <input
              type="date"
              {...register('maxEndDate', {
                required: false,
              })}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="m-1">
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              SortBy
            </label>
            <select
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              {...register('sortBy')}
            >
              <option></option>
              {sortByOptions.map((option, i) => (
                <option key={`s${i}`} value={option}>
                  {`${option}`}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Order
            </label>
            <select
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              {...register('sortOrder')}
            >
              <option></option>
              {sortOrderOptions.map((option, i) => (
                <option key={`s${i}`} value={option}>
                  {`${option}`}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            <button
              disabled={isLoading}
              type="submit"
              className="group relative mt-7 rounded-md bg-indigo-600 py-2 px-6 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="-mx-1 flex flex-wrap lg:-mx-4">
        {data.data.map((assignation) => {
          return (
            <div
              className="my-2 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4"
              key={assignation.id}
            >
              <article className="overflow-hidden rounded-lg border-2 border-gray-300 pb-2 shadow-xl hover:shadow-2xl">
                <header className="flex items-center justify-between p-2 leading-tight md:p-4">
                  <h1 className="text-lg">
                    <p className="text-black no-underline hover:underline">
                      Name:{' '}
                      {`${assignation.user?.firstName} ${assignation.user?.lastName}`}
                    </p>
                  </h1>
                </header>

                <div className="w-full">
                  <table className="w-full table-auto p-2">
                    <tbody>
                      <tr>
                        <td className="px-2 py-1">ID:</td>
                        <td className="px-2 py-1">{assignation.id}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1">Start Date:</td>
                        <td className="px-2 py-1">{assignation.startDate}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1">End Date:</td>
                        <td className="px-2 py-1">{assignation.endDate}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1">Account:</td>
                        <td className="px-2 py-1">
                          {assignation.account?.name}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-6 flex w-full justify-center">
                  {assignation.status && (
                    <button
                      onClick={() => {
                        mutateOnClick(assignation.id);
                      }}
                      className="group relative  rounded-md bg-indigo-600 py-2 px-6 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Finish Assignation
                    </button>
                  )}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AssignationsComponent;
