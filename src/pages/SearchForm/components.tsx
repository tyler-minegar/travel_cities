import styled from "styled-components";
import { Button, Card } from "react-bootstrap";

export const SearchCardWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  max-width: 734px;
  margin-left: auto;
  margin-right: auto;
`;

export const SearchCityCard = styled(Card)`
  padding: 62px;
  border: unset;
`;

export const CircleIcon = styled.img`
  position: absolute;
  bottom: 10px;
`;

export const DestinationIcon = CircleIcon;

export const RouteIcon = styled.img`
  position: absolute;
  left: 17px;
  bottom: 32px;
`;

export const AddDestinationButton = styled.span`
  color: #7786d2;
  font-size: 12px;
  cursor: pointer;
`;

export const SubmitButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
`;

export const ErrorMessage = styled.span`
  position: absolute;
  top: 100%;
  font-weight: 500;
  font-size: 12px;
  color: #ff0000;
  white-space: nowrap;
`;
