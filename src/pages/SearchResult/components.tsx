import styled from "styled-components";

export const CityName = styled.span`
  position: absolute;
  left: 30px;
  font-size: 12px;
  font-weight: 500;
  top: 4px;
  white-space: nowrap;
`;

export const RouteIcon = styled.img`
  position: absolute;
  left: 4px;
  top: -16px;
`;

export const Distance = styled.span`
  position: absolute;
  font-weight: 500;
  color: #7786d2;
  font-size: 14px;
  padding: 0px 10px 0px 8px;
  border: 1px solid #7786d2;
  border-radius: 4px;
  right: 20px;
  top: -18px;

  &::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    border-right: 1px solid #7786d2;
    border-bottom: 1px solid #7786d2;
    top: 7px;
    right: -3.5px;
    transform: rotate(315deg);
    background: white;
  }
`;

export const CityOtherInfo = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 22px;

  .purple-color {
    color: #7786d2;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 16px;
  color: #7786d2;
  padding-top: 80px;
  padding-bottom: 80px;
`;
