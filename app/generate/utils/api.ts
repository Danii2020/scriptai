import axiosInstance from "./axiosInstance";
import { URL } from "./constants";

// Stream formData to /generate-script using fetch and response.body.getReader().
// If `onChunk` is provided, it will be called with each streamed chunk.
export async function generateScript(
  formData: FormData,
  onChunk?: (chunk: string) => void
) {
  const resp = await fetch(`${URL}/generate-script`, {
    method: "POST",
    body: formData,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_HEADER_API_KEY || "",
      // Don't set Content-Type header - browser will set it with boundary for FormData
    },
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Request failed: ${resp.status}`);
  }

  if (!resp.body) {
    throw new Error("Response body is empty");
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder("utf-8");
  console.log("reader", reader);

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Decode the chunk (may contain partial SSE messages)
      const chunk = decoder.decode(value, { stream: true });
      console.log("chunk", chunk);
        if (onChunk) {
        onChunk(chunk);
      }
    }
    
    // Decode any remaining buffered data
    const remaining = decoder.decode();
    if (remaining && onChunk) {
      onChunk(remaining);
    }
  } finally {
    reader.releaseLock();
  }
}

export async function pollTask(taskId: string) {
  return axiosInstance.get(`${URL}/task/${taskId}`);
}

export async function downloadScript(filePath: string) {
  return axiosInstance.get(`${URL}/download-script`, {
    params: {
      file_path: filePath,
    },
    responseType: 'blob',
  });
} 