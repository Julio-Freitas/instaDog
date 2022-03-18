import { useCallback, useState } from "react";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState();

  const request = useCallback(async (url: string, options: any) => {
    let json = null;
    let response = null;
    try {
      setError(null);
      setLoading(true);

      response = await fetch(url, options);
      json = await response.json();

      if (!response.ok) throw new Error(json.message);
    } catch (error: any) {
      json = null;
      setError(error?.message);
    } finally {
      setData(json);
      setLoading(false);

      return {
        json,
        response,
      };
    }
  }, []);

  return {
    loading,
    error,
    data,
    request,
  };
}
