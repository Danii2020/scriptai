import axios from "axios";
import { URL } from "./constants";

export async function generateScript(formData: FormData) {
  return axios.post(`${URL}/generate-script`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function pollTask(taskId: string) {
  return axios.get(`${URL}/task/${taskId}`);
}

export async function downloadScript(taskId: string) {
  return axios.get(`${URL}/download-script/${taskId}`, {
    responseType: 'blob',
  });
} 