import { CORE_API_URL } from '@/lib/consts';

export async function coreApiFetch(endpoint: string, options: RequestInit) {
  const url = `${CORE_API_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const config = {
    ...options,
    headers: defaultHeaders,
  };

  const response = await fetch(url, config);

  return response;
}
