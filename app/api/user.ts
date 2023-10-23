import axios from 'axios';

export const getUsers = async (currentPage: number = 1) => {
  try {
    const {data} = await axios.get(
      `https://reqres.in/api/users?page=${currentPage}`,
    );

    return {
      totalPages: data?.total_pages ?? 0,
      users: data.data,
    };
  } catch (error) {
    console.log(error);
  }
};
