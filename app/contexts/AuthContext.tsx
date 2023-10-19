import {createContext} from 'react';
import {User} from '../types/user';

type AuthContextType = {
  activeUser: User | null;
  token: string | null;
  updateActiveUser: (user: Partial<User>) => void;
  updateToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  activeUser: null,
  token: null,
  updateActiveUser: () => {},
  updateToken: () => {},
});
