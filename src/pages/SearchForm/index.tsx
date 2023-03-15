import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import queryString from "query-string";

import SearchCitySelect from "../../components/SearchCitySelect";
import PassengerInput from "../../components/PassengerInput";
import DateInput from "../../components/DateInput";
import {
  SearchCardWrapper,
  SearchCityCard,
  CircleIcon,
  DestinationIcon,
  RouteIcon,
  AddDestinationButton,
  SubmitButton,
  ErrorMessage,
} from "./components";
import { getCityFormFromURL } from "../../utils/city";

const validationSchema = Yup.object().shape({
  originCity: Yup.string().required("You must choose the city of origin"),
  passenger: Yup.number().min(1, "Select passengers"),
  date: Yup.string().required("Select date"),
});

const SearchForm = () => {
  const [isTouchDestinationCities, setIsTouchDestinationCities] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormik({
    initialValues: getCityFormFromURL(location.search),
    validationSchema,
    onSubmit: (values) => {
      navigate(`/result?${queryString.stringify(values)}`);
    },
  });

  useEffect(() => {
    navigate(`/?${queryString.stringify(formik.values)}`);
  }, [formik.values, navigate]);

  const isSubmitDisabled = useMemo(() => {
    let destinationValidation = false;

    if (!formik.values.destinationCities.length) destinationValidation = true;
    for (let city of formik.values.destinationCities) {
      if (!city) destinationValidation = true;
    }

    return destinationValidation || !formik.isValid;
  }, [formik.isValid, formik.values.destinationCities]);

  function addDestination() {
    const destinationCities: string[] = formik.values.destinationCities;

    destinationCities[destinationCities.length] = "";
    formik.setFieldValue("destinationCities", [...destinationCities]);
  }

  function updateFormikOriginCity(value: string) {
    formik.setFieldValue("originCity", value);
  }

  function updateFomikDestinations(index: number, value: string) {
    const destinationCities: string[] = formik.values.destinationCities;

    destinationCities[index] = value;
    formik.setFieldValue("destinationCities", [...destinationCities]);
  }

  function validateDestination(destinationCities: string[], index: number) {
    if (destinationCities[index]) return false;
    return true;
  }

  function updatePassenger(value: number) {
    formik.setFieldValue("passenger", value);
  }

  function updateDate(value: Date | null) {
    formik.setFieldValue("date", value);
  }

  return (
    <SearchCardWrapper>
      <SearchCityCard className="w-100">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xs={12} md={9}>
              <Row>
                <Col xs={2} className="position-relative">
                  <CircleIcon src="/images/circle_icon.png" alt="circle icon" />
                </Col>
                <Col xs={10} className="position-relative">
                  <SearchCitySelect
                    label="City of origin"
                    id="originCity"
                    name="originCity"
                    onChange={updateFormikOriginCity}
                    value={formik.values.originCity}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.originCity && formik.errors.originCity && (
                    <ErrorMessage>{formik.errors.originCity}</ErrorMessage>
                  )}
                </Col>
                {formik.values.destinationCities.map((city, index) => (
                  <React.Fragment key={index}>
                    <Col xs={2} className="position-relative mt-3">
                      <RouteIcon
                        src="/images/route_icon.png"
                        alt="route icon"
                      />
                      {index + 1 === formik.values.destinationCities.length ? (
                        <DestinationIcon
                          src="/images/destination_icon.png"
                          alt="destination icon"
                        />
                      ) : (
                        <CircleIcon
                          src="/images/circle_icon.png"
                          alt="circle icon"
                        />
                      )}
                    </Col>
                    <Col xs={10} className="mt-3 position-relative">
                      <SearchCitySelect
                        label="City of destination"
                        onChange={(val: string) =>
                          updateFomikDestinations(index, val)
                        }
                        value={city}
                        onBlur={() => setIsTouchDestinationCities(true)}
                      />
                      {validateDestination(
                        formik.values.destinationCities,
                        index
                      ) &&
                        isTouchDestinationCities && (
                          <ErrorMessage>
                            You must choose the city of origin
                          </ErrorMessage>
                        )}
                    </Col>
                  </React.Fragment>
                ))}
                <Col
                  xs={2}
                  className="position-relative d-flex align-items-center mt-4"
                >
                  <img src="/images/plus_icon.png" alt="plus icon" />
                </Col>
                <Col xs={10} className="mt-4">
                  <AddDestinationButton onClick={addDestination}>
                    Add destination
                  </AddDestinationButton>
                </Col>
              </Row>
            </Col>
            <Col xs={0} md={1}></Col>
            <Col xs={12} md={2}>
              <Row>
                <Col xs={2} md={0}></Col>
                <Col xs={5} md={12}>
                  <div className="position-relative mt-sm-1rem">
                    <PassengerInput
                      value={Number(formik.values.passenger)}
                      onChange={(value: number) => updatePassenger(value)}
                    />
                    {formik.errors.passenger && (
                      <ErrorMessage>{formik.errors.passenger}</ErrorMessage>
                    )}
                  </div>
                </Col>
                <Col xs={5} md={12}>
                  <div className="position-relative">
                    <DateInput
                      label="Date"
                      className="mt-3"
                      value={formik.values.date}
                      onChange={(value: Date | null) => updateDate(value)}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <div className="d-flex mt-4">
              <SubmitButton
                variant="secondary"
                disabled={isSubmitDisabled}
                type="submit"
                className="w-sm-full"
              >
                Submit
              </SubmitButton>
            </div>
          </Row>
        </Form>
      </SearchCityCard>
    </SearchCardWrapper>
  );
};

export default SearchForm;
