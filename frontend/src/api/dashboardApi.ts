import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getStates = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/states`);
  return response.data;
};

export const getDashboardData = async (
  state: string,
  fromDate: string,
  toDate: string
) => {
  const response = await axios.get(
    `${BASE_URL}/dashboard?state=${state}&from=${fromDate}&to=${toDate}`
  );
  return response.data;
};


export const getDateRange = async (state: string) => {
  const response = await axios.get(
    `${BASE_URL}/date-range?state=${state}`
  );
  return response.data;
};

