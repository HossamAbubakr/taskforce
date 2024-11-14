export const API_URL = "http://localhost:5002/api";

async function apiCall<TRequest, TResponse>(
  endpoint: string,
  method: string = "GET",
  body?: TRequest
): Promise<TResponse> {
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Failed to ${method} ${endpoint}`);
  }

  const data: TResponse = await response.json();
  return data;
}

export async function get<TResponse>(endpoint: string): Promise<TResponse> {
  return apiCall<void, TResponse>(endpoint, "GET");
}

export async function post<TRequest, TResponse>(
  endpoint: string,
  body: TRequest
): Promise<TResponse> {
  return apiCall<TRequest, TResponse>(endpoint, "POST", body);
}

export async function put<TRequest, TResponse>(
  endpoint: string,
  body: TRequest
): Promise<TResponse> {
  return apiCall<TRequest, TResponse>(endpoint, "PUT", body);
}

export async function del<TResponse>(endpoint: string): Promise<TResponse> {
  return apiCall<void, TResponse>(endpoint, "DELETE");
}
