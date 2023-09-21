import axios_instance from "@/utils/axiosInstance";
import { FormValuesType } from "@/utils/interfaces";

export const useGetJob = async (id: number): Promise<FormValuesType> => {
  try {
    const response = await axios_instance.get(`/jobs/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job detail:", error);
    throw error;
  }
};
