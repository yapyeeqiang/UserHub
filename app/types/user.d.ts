export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type UserState = {
  token: string | null;
  activeUser: Partial<User> | null;
  totalPages: number;
  users: User[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
};
