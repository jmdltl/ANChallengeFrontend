import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getClientApi, patchClientApi } from '../../services/api.clients';

function EditUserComponent() {
  const queryClient = useQueryClient();
  const [infoMessage, setInfoMessage] = useState('');
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const GetClientQuery = useQuery({
    queryKey: ['clients', id],
    queryFn: () => getClientApi(id),
    onSuccess: ({ data }) => {
      const { name } = data;
      reset({ name });
    },
  });

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: patchClientApi,
    onSuccess: (data, variables, context) => {
      setInfoMessage('Client updated');
      queryClient.refetchQueries(['clients']);
    },
    onError: ({ response }) => {
      setInfoMessage(response.data.message);
    },
  });

  useEffect(() => {
    if (GetClientQuery.data && GetClientQuery.data.data) {
      const { name } = GetClientQuery.data.data;
      reset({ name });
    }
  }, [GetClientQuery.data]);

  if (GetClientQuery.isLoading) return <>'Loading...'</>;

  if (GetClientQuery.error)
    return <>'An error has occurred retrieving the client'</>;

  const onSubmit = async ({ name }: { name: string }) => {
    try {
      mutate({
        id,
        name,
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
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Client Name
          </label>
          <input
            type="text"
            {...register('name', { required: false })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
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

export default EditUserComponent;
