import queryString from "query-string";

export const getCityFormFromURL = (url: string) => {
  const parsedQuery = queryString.parse(url) as {
    [key: string]: string;
  };

  return {
    date: parsedQuery.date || "01/01/23",
    destinationCities: parsedQuery.destinationCities
      ? parsedQuery.destinationCities.toString().split(",")
      : [],
    originCity: parsedQuery.originCity || "",
    passenger: parsedQuery.passenger || "10",
  };
};
