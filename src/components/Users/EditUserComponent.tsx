import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getUserApi, patchUserApi } from '../../services/api.users';

const englishLevels = ['PRE_A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

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

  const GetUserQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserApi(id),
    onSuccess: ({ data }) => {
      const { firstName, lastName, techSkills, resumeLink, englishLevel } =
        data;
      reset({ firstName, lastName, techSkills, resumeLink, englishLevel });
    },
  });

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: patchUserApi,
    onSuccess: (data, variables, context) => {
      setInfoMessage('User updated');
      queryClient.refetchQueries(['users', id]);
    },
    onError: ({ response }) => {
      setInfoMessage(response.data.message);
    },
  });

  useEffect(() => {
    if (GetUserQuery.data && GetUserQuery.data.data) {
      const { firstName, lastName, techSkills, resumeLink, englishLevel } =
        GetUserQuery.data.data;
      reset({ firstName, lastName, techSkills, resumeLink, englishLevel });
    }
  }, [GetUserQuery.data]);

  if (GetUserQuery.isLoading) return <>'Loading...'</>;

  if (GetUserQuery.error)
    return <>'An error has occurred retrieving the user'</>;

  const onSubmit = async ({
    firstName,
    lastName,
    techSkills,
    resumeLink,
    englishLevel,
  }: {
    firstName?: string;
    lastName?: string;
    techSkills?: string;
    resumeLink?: string;
    englishLevel?: string;
  }) => {
    try {
      mutate({
        id,
        firstName,
        lastName,
        techSkills,
        resumeLink,
        englishLevel,
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
            Email
          </label>
          <span className="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-300 p-2.5 text-sm text-gray-900">
            {GetUserQuery.data.data.email}
          </span>
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            {...register('firstName', { required: false })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            {...register('lastName', { required: false })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Tech Skills
          </label>
          <input
            type="text"
            {...register('techSkills', { required: false })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Resume Link
          </label>
          <input
            type="text"
            {...register('resumeLink', { required: false })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            English level
          </label>

          <select
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register('englishLevel')}
          >
            {englishLevels.map((level, i) => (
              <option key={i} value={level}>
                {level}
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

export default EditUserComponent;
