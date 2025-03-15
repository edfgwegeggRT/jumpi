import { QueryClient, QueryFunction } from "@tanstack/react-query";

// For static site without a backend, we'll use mock responses
// that return empty data that won't affect gameplay
const staticResponses: Record<string, any> = {
  '/api/highscores': { highScores: [] },
  '/api/players': { players: [] }
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // For static sites, simulate success response
  if (window.location.hostname.includes('netlify.app') || 
      window.location.hostname.includes('github.io')) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Regular API request for development
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const urlKey = queryKey[0] as string;
    
    // For static sites, return mock data
    if (window.location.hostname.includes('netlify.app') || 
        window.location.hostname.includes('github.io')) {
      if (staticResponses[urlKey]) {
        return staticResponses[urlKey];
      }
      // Default empty response
      return {};
    }

    // Regular API request for development
    const res = await fetch(urlKey, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
