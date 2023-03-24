import api from './api.axios';

export const getClientsApi = (take: number, skip: number) => {
  let queryString = `?take=${take}&skip=${skip}`;
  return api.get(`/clients${queryString}`);
};

export const getClientApi = (id: number | string) => {
  return api.get(`/clients/${id}`);
};

export const postClientApi = ({ name }: { name: string }) => {
  return api.post(`/clients`, {
    name,
  });
};

export const patchClientApi = ({
  id,
  name,
}: {
  id: number | string;
  name: string;
}) => {
  return api.patch(`/clients/${id}`, {
    name,
  });
};
