import axiosInstance from "./axiosInstance";
import { URL } from "./constants";

export async function generateScript(formData: FormData) {
  return axiosInstance.post(`${URL}/generate-script`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function pollTask(taskId: string) {
  return axiosInstance.get(`${URL}/task/${taskId}`);
}

export async function downloadScript(taskId: string) {
  return axiosInstance.get(`${URL}/download-script/${taskId}`, {
    responseType: 'blob',
  });
} 