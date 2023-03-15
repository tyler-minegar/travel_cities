import styled from "styled-components";
import { ListGroup, Form } from "react-bootstrap";

export const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  background: white;
  width: 100%;
  border: 1px solid #c7d1f4;
  border-radius: 8px;
  top: calc(100% + 7px);
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #c7d1f4;
    top: -6px;
    left: 16px;
  }
`;

export const CityListGroup = styled(ListGroup)`
  position: absolute;
  top: calc(100% + 7px);
  background: white;
  width: 100%;
  border: 1px solid #c7d1f4;
  border-radius: 8px;
  padding: 6px;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #c7d1f4;
    top: -6px;
    left: 16px;
  }

  .list-group-item {
    border-color: white;
    border-radius: 8px;

    &:hover {
      background: #c7d1f4;
      cursor: pointer;
    }
  }
`;

export const CrossIcon = styled.img`
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 11px;
`;

export const InputLabel = styled(Form.Label)`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 0;
`;
