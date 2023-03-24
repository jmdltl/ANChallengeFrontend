import api from './api.axios';

export const getAccountsApi = (take: number, skip: number) => {
  let queryString = `?take=${take}&skip=${skip}`;
  return api.get(`/accounts${queryString}`);
};

export const getAccountApi = (id: number | string) => {
  return api.get(`/accounts/${id}`);
};

export const postAccountApi = ({
  name,
  clientId,
  responsibleId,
}: {
  name: string;
  clientId: number | string;
  responsibleId: number | string;
}) => {
  return api.post(`/accounts`, {
    name,
    clientId,
    responsibleId,
  });
};

export const patchAccountApi = ({
  id,
  name,
  clientId,
  responsibleId,
}: {
  id: number | string;
  name?: string;
  clientId?: number | string;
  responsibleId?: number | string;
}) => {
  return api.patch(`/accounts/${id}`, {
    name,
    clientId,
    responsibleId,
  });
};
