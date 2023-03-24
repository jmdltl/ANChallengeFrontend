import api from './api.axios';

export const getUsersApi = (take: number, skip: number) => {
  let queryString = `?take=${take}&skip=${skip}`;
  return api.get(`/users${queryString}`);
};

export const getUserApi = (id: number | string) => {
  return api.get(`/users/${id}`);
};

export const postUserApi = ({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName?: string;
  lastName?: string;
}) => {
  return api.post(`/users`, {
    email,
    firstName,
    lastName,
  });
};

export const patchUserApi = ({
  id,
  firstName,
  lastName,
  techSkills,
  resumeLink,
  englishLevel,
}: {
  id: number | string;
  firstName?: string;
  lastName?: string;
  techSkills?: string;
  resumeLink?: string;
  englishLevel?: string;
}) => {
  return api.patch(`/users/${id}`, {
    firstName,
    lastName,
    techSkills,
    resumeLink,
    englishLevel,
  });
};
