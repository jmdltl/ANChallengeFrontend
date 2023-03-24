export type DecodedToken = {
  jwt: {
    user: {
      id: number;
      email: string;
      role: string;
    };
  };
};
