import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { SearchCardWrapper, SearchCityCard } from "../SearchForm/components";
import Spinner from "../../components/Spinner";
import { getCalcuateDistances } from "../../redux/modules/citySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CityName,
  RouteIcon,
  Distance,
  CityOtherInfo,
  ErrorMessage,
} from "./components";
import { getCityFormFromURL } from "../../utils/city";

export interface CityForm {
  date: string;
  destinationCities: string[];
  originCity: string;
  passenger: string;
}

const SearchResult = () => {
  const cityFormValue = useRef<CityForm>({
    date: "",
    destinationCities: [],
    originCity: "",
    passenger: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { distances, status } = useAppSelector((state) => state.city);

  const totalDistance = useMemo(() => {
    return distances
      .reduce((sum, distance) => Number(distance) + sum, 0)
      .toFixed(2);
  }, [distances]);

  useEffect(() => {
    cityFormValue.current = getCityFormFromURL(location.search);
  }, [location]);

  useEffect(() => {
    dispatch(
      getCalcuateDistances([
        cityFormValue.current.originCity,
        ...cityFormValue.current.destinationCities,
      ])
    );
  }, [dispatch]);

  function formatDate(date: string) {
    const dateObj: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
  }

  return (
    <SearchCardWrapper>
      <SearchCityCard className="w-100">
        {status === "loading" ? (
          <Spinner />
        ) : (
          <div className="d-flex flex-column align-items-center">
            {status === "failed" ? (
              <ErrorMessage>Oops! Something went wrong!</ErrorMessage>
            ) : (
              <>
                <div className="position-relative">
                  <img src="/images/circle_icon.png" alt="circle icon" />
                  <CityName>{cityFormValue.current.originCity}</CityName>
                </div>
                {cityFormValue.current.destinationCities.map(
                  (city: string, index: number) => (
                    <div className="position-relative mt-3" key={city + index}>
                      <RouteIcon
                        src="/images/result_route_icon.png"
                        alt="route icon"
                      />
                      {index + 1 ===
                      cityFormValue.current.destinationCities.length ? (
                        <img
                          src="/images/destination_icon.png"
                          alt="destination icon"
                        />
                      ) : (
                        <img src="/images/circle_icon.png" alt="circle icon" />
                      )}
                      <CityName>{city}</CityName>
                      <Distance>{distances[index]}km</Distance>
                    </div>
                  )
                )}
                <CityOtherInfo>
                  <span className="purple-color">{totalDistance} km</span> is
                  total distance
                </CityOtherInfo>
                <CityOtherInfo className="mt-2">
                  <span className="purple-color">
                    {cityFormValue.current.passenger}
                  </span>{" "}
                  passengers
                </CityOtherInfo>
                <CityOtherInfo className="mt-2">
                  <span className="purple-color">
                    {formatDate(cityFormValue.current.date)}
                  </span>
                </CityOtherInfo>
              </>
            )}

            <Button
              variant="secondary"
              className="mt-4 w-sm-full"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </div>
        )}
      </SearchCityCard>
    </SearchCardWrapper>
  );
};

export default SearchResult;
