import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postUserApi } from '../../services/api.users';

function CreateUserComponent() {
  const queryClient = useQueryClient();
  const [infoMessage, setInfoMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { mutate, isLoading, isError, isSuccess } = useMutation(['user'], {
    mutationFn: postUserApi,
    onSuccess: (data, variables, context) => {
      setInfoMessage('User created');
      queryClient.refetchQueries(['users']);
    },
    onError: ({ response }) => {
      setInfoMessage(response.data.message);
    },
  });

  const onSubmit = async ({
    email,
    firstName,
    lastName,
  }: {
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      mutate({
        email,
        firstName,
        lastName,
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
          <input
            type="text"
            {...register('email', {
              required: 'A valid email is required',
              pattern: emailRegex,
            })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
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

export default CreateUserComponent;
