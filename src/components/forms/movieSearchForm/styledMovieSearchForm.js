import styled from 'styled-components';
import { Form, Row, Col } from 'antd';
import { colors } from '../../../constants/styleConstants';

const AntRow = styled(Row)`
  input {
    color: ${({ color }) => color};
  }
  .ant-radio-wrapper {
    font-size: 0.77rem;
  }
  .ant-input-lg {
    font-size: 1.1rem;
  }
  .ant-form-item-label {
    padding-bottom: 0;
  }
  .ant-form-item-label {
    & > label {
      color: ${({ color }) => color};
      font-size: 0.8rem;
    }
  }

  .ant-form-item-control-input {
    min-height: min-content;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: #fff !important ;
  }
  .ant-radio-wrapper {
    color: ${({ color }) => color};
  }
  .ant-radio-inner {
    background-color: ${() => colors.GREY_COLOR_1};
  }
  .ant-radio-checked .ant-radio-inner:after {
    background-color: ${() => colors.white};
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: #fff;
  }
  .ant-radio-checked .ant-radio-inner:focus {
    border-color: green;
  }
  .ant-slider {
    padding: 0;
    height: 0;
    &:hover {
      background-color: ${() => colors.GREY_COLOR_2};
    }
  }
  .ant-slider-track {
    background-color: ${() => colors.GREY_COLOR_2};
    &:hover {
      background-color: ${() => colors.GREY_COLOR_2};
    }
  }
  .ant-slider-handle {
    background-color: ${() => colors.GREY_COLOR_2};
    border: ${() => `2px solid ${colors.GREY_COLOR_2}`};
    &:focus {
      box-shadow: none;
      border-color: none;
    }
  }
`;

const SliderRangeLabel = styled(Col)`
  display: flex;
  font-size: 0.77rem;
  align-items: center;
  justify-content: center;
  color: ${() => colors.GREY_COLOR_2};
`;
export { AntRow, SliderRangeLabel };
