import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../../context/provider';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { Form, Row, Col, Input, Radio, Slider, Button } from 'antd';
import { colors } from '../../../constants/styleConstants';
import debounceHandler from '../../../helpers/debounceHandler';
import loadMovieList from '../../../context/actions/loadMovieList';

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
const MovieSearchForm = () => {
  const {
    movieListContext: { movieListDispatch }
  } = useContext(GlobalContext);

  // const [formVal, setFormVal] = useState({});
  const [form] = Form.useForm();

  const onFinishFunc = (values) => {
    loadMovieList(values)(movieListDispatch);
    console.log('Received values of form: ', values);
  };
  const submitForm = () => {
    console.log('yes triggered submit');
    form.submit();
  };
  // const onChangeForm = () => {
  //   console.log('yes triggered onChangeForm');
  //   form.onChange();
  // };
  return (
    <Form
      form={form}
      name="searchMovie_form"
      layout="vertical"
      initialValues={{
        // yearRange: [], // add initial value to min and max form data I get form the server
        movieKeyword: '',
        videoType: 'any'
      }}
      onFinish={onFinishFunc}
      // submit={submitForm}
      // onChange={onChangeForm}
    >
      <AntRow color={colors.white}>
        <Col xs={{ span: 24 }} lg={{ span: 9 }}>
          <Form.Item style={{ marginBottom: 0 }} name="movieKeyword">
            <Input
              // style={{ fontSize: '3rem' }}
              bordered={false}
              size="large"
              placeholder="Search"
              prefix={
                <SearchOutlined
                  // htmltype="submit"
                  onClick={submitForm}
                  style={{ fontSize: '1.2rem', paddingRight: '0.5rem', color: colors.white }}
                />
              }
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 15 }}>
          <AntRow justify="end" color={colors.white}>
            <Col xs={{ span: 12 }} lg={{ span: 7 }}>
              <AntRow>
                <SliderRangeLabel span={3}>1970</SliderRangeLabel>
                <Col span={18}>
                  <Form.Item label="YEAR" style={{ marginBottom: 0 }} name="yearRange">
                    <Slider
                      onChange={() => submitForm('delay')}
                      // onKeyPress={(e) => radioValueChange(e)}
                      disabled={true}
                      range
                      min={0}
                      max={0}
                      // defaultValue={[1999, 2009]}
                    />
                  </Form.Item>
                </Col>
                <SliderRangeLabel span={3}>2015</SliderRangeLabel>
              </AntRow>
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 12 }}>
              <AntRow justify="end">
                <Form.Item label="TYPE" style={{ marginBottom: 0 }} name="videoType">
                  <Radio.Group onChange={submitForm}>
                    <Radio value="any">Any</Radio>
                    <Radio value="movie">Movies</Radio>
                    <Radio value="series">Series</Radio>
                    <Radio value="episode">Episodes</Radio>
                  </Radio.Group>
                </Form.Item>
                {/* <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item> */}
              </AntRow>
            </Col>
          </AntRow>
        </Col>
      </AntRow>
    </Form>
  );
};

export default MovieSearchForm;
