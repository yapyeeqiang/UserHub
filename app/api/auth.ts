import axios, {AxiosError, AxiosResponse} from 'axios';

const authClient = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const signIn = async (
  email: string,
  password: string,
): Promise<string | undefined> => {
  try {
    const response: AxiosResponse<{token: string}> = await authClient.post(
      '/login',
      {
        email,
        password,
      },
    );

    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      return undefined;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response) {
        console.log('Server error:', axiosError.response.data);
      } else {
        console.log('Network error:', axiosError.message);
      }
    } else {
      console.log('Unexpected error:', error);
    }

    return undefined;
  }
};

export const signUp = async (
  email: string,
  password: string,
): Promise<{id: string; token: string} | undefined> => {
  try {
    const response: AxiosResponse<{id: string; token: string}> =
      await authClient.post('/register', {
        email,
        password,
      });

    if (response.data && response.data.token) {
      return {...response.data};
    } else {
      return undefined;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response) {
        console.log('Server error:', axiosError.response.data);
      } else {
        console.log('Network error:', axiosError.message);
      }
    } else {
      console.log('Unexpected error:', error);
    }

    return undefined;
  }
};
