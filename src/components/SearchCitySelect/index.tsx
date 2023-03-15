import { useState, ChangeEvent, FocusEvent } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { debounce } from "lodash";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import {
  SpinnerWrapper,
  CityListGroup,
  CrossIcon,
  InputLabel,
} from "./components";
import Spinner from "../Spinner";
import { searchCity } from "../../services/cityService";
import type { City } from "../../types";

interface SearchCitySelectProps {
  label: string;
  onChange: Function;
  onBlur?: Function;
  [key: string]: any;
  value: string;
}

const SearchCitySelect = ({
  label,
  onChange,
  onBlur,
  value,
  ...otherProps
}: SearchCitySelectProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isClickItem, setIsClickItem] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<City[]>([]);

  const debounceSearchCity = debounce((keyword: string) => {
    setIsLoading(true);
    searchCity(keyword)
      .then((response: AxiosResponse<{ cities: City[] }>) => {
        const { cities } = response.data;
        setResult(cities);
        setIsLoading(false);
      })
      .catch((error) => {
        setResult([]);
        setIsLoading(false);
        if (
          error.response.status === 400 &&
          error.response.data.error === "fail_search_city"
        )
          return toast.error("Failed in searching city");
        return toast.error("Internal Server Error!");
      });
  }, 500);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    debounceSearchCity(event.target.value);
    setIsClickItem(false);
    setInputValue(event.target.value);
  }

  function handleClickItem(index: number) {
    setInputValue(result[index].name);
    setIsClickItem(true);
    onChange(result[index].name);
    setResult([]);
  }

  function clearInput() {
    setInputValue("");
    setIsClickItem(false);
    onChange("");
    setResult([]);
  }

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    if (onBlur) onBlur(event);
    if (!isClickItem) onChange("");
  }

  return (
    <Form.Group className="position-relative">
      <InputLabel>{label}</InputLabel>
      <Form.Control
        type="string"
        {...otherProps}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={inputValue}
      />
      {inputValue && (
        <CrossIcon
          src="/images/cross_icon.png"
          alt="cross icon"
          onClick={clearInput}
        />
      )}
      {isLoading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {result.length ? (
        <CityListGroup>
          {result.map((item, index) => (
            <ListGroup.Item
              key={item.name + index}
              onClick={() => handleClickItem(index)}
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </CityListGroup>
      ) : (
        ""
      )}
    </Form.Group>
  );
};

export default SearchCitySelect;
