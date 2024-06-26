import { useState, useMemo } from "react";

const useFetch = (url: string | null, endpoint: string | null) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const info = useMemo(() => {
    return { url, endpoint };
  }, [url, endpoint]);
  const abortController = useMemo(() => new AbortController(), []);

  const handleFetch = (
    query:
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams
      | null = null,
    options: Object | undefined = undefined
  ) => {
    if (isFetching) abortController.abort();
    setIsFetching(true);
    const handle = fetch(
      `${info.url}${info.endpoint}${
        query != null ? `?${new URLSearchParams(query)}` : ""
      }`,
      options
    ).then((res) => {
      setIsFetching(false);
      return res;
    });
    return handle;
  };

  return handleFetch;
};

export default useFetch;
