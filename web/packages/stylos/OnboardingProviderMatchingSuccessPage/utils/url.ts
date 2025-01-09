export function appendToUrl(
  initialUrl: string,
  queryParams: Record<string, string> = {}
) {
  if (Object.keys(queryParams).length > 0) {
    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            queryParams[key]
          )}`
      )
      .join('&');

    return initialUrl.includes('?')
      ? `${initialUrl}&${queryString}`
      : `${initialUrl}?${queryString}`;
  }

  return initialUrl;
}
