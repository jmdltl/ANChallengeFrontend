import api from './api.axios';

export const getAssignationsApi = (
  take: number,
  skip: number,
  options?: {
    userName?: string;
    accountName?: string;
    minStartDate?: string;
    maxEndDate?: string;
    sortBy?: string;
    sortOrder?: string;
  },
) => {
  let queryString = `?take=${take}&skip=${skip}&populateInfo=true`;
  if (options.userName && options.userName !== '')
    queryString += `&userName=${options.userName}`;
  if (options.accountName && options.accountName !== '')
    queryString += `&accountName=${options.accountName}`;
  if (options.minStartDate && options.minStartDate !== null)
    queryString += `&minStartDate=${options.minStartDate}`;
  if (options.maxEndDate && options.maxEndDate !== null)
    queryString += `&maxEndDate=${options.maxEndDate}`;
  if (options.sortBy && options.sortBy !== '')
    queryString += `&sortBy=${options.sortBy}`;
  if (options.sortOrder && options.sortOrder !== '')
    queryString += `&sortOrder=${options.sortOrder}`;

  return api.get(`/assignations${queryString}`);
};

export const getAssignationApi = (id: number | string) => {
  return api.get(`/assignations/${id}`);
};

export const postAssignationApi = ({
  userId,
  accountId,
}: {
  userId: number | string;
  accountId: number | string;
}) => {
  return api.post(`/assignations`, {
    userId,
    accountId,
  });
};

export const patchAssignationApi = ({ id }: { id: number | string }) => {
  return api.patch(`/assignations/${id}`);
};
