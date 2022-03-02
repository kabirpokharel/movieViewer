import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../../context/provider';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { Form, Row, Col, Input, Radio, Slider, Button } from 'antd';
import { colors } from '../../../constants/styleConstants';
import debounceHandler from '../../../helpers/debounceHandler';
import loadMovieList from '../../../context/actions/loadMovieList';
import { UPDATE_QUERY_DETAILS } from '../../../constants/actionConstants';
import isEmpty from '../../../helpers/isEmpty';

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
  const [form] = Form.useForm();
  const {
    movieListContext: { movieListDispatch, movieListState }
  } = useContext(GlobalContext);
  const { searchParams } = movieListState;
  const disableYearRange = () => {
    let result = false;
    if (isEmpty(movieListState.searchParams)) {
      result = true;
    } else if (isEmpty(movieListState.searchParams.yearRange)) {
      result = true;
    }
    return result;
  };
  const onFinishFunc = (values) => {
    const pageNumber = searchParams.pageNumber || 1;
    const queryParams = { ...values, pageNumber };
    movieListDispatch({ type: UPDATE_QUERY_DETAILS, payload: queryParams });
    loadMovieList(movieListDispatch, movieListState, {
      ...searchParams,
      ...queryParams
    });
  };
  const submitForm = () => {
    form.submit();
  };
  return (
    <Form
      form={form}
      name="searchMovie_form"
      layout="vertical"
      initialValues={{
        yearRange: [], // add initial value to min and max form data I get form the server
        movieKeyword: '',
        videoType: 'any'
      }}
      onFinish={onFinishFunc}>
      <AntRow color={colors.white}>
        <Col xs={{ span: 24 }} lg={{ span: 9 }}>
          <Form.Item style={{ marginBottom: 0 }} name="movieKeyword">
            <Input
              bordered={false}
              size="large"
              placeholder="Search"
              prefix={
                <SearchOutlined
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
                {!disableYearRange() && (
                  <SliderRangeLabel span={3}>{searchParams.yearRange[0]}</SliderRangeLabel>
                )}
                <Col span={18}>
                  <Form.Item label="YEAR" style={{ marginBottom: 0 }} name="yearRange">
                    <Slider
                      // onChange={submitForm}
                      disabled={disableYearRange()}
                      range={true}
                      min={(!disableYearRange() && searchParams.yearRange[0]) || 0}
                      max={(!disableYearRange() && searchParams.yearRange[1]) || 0}
                      defaultValue={
                        !disableYearRange()
                          ? [searchParams.yearRange[0], searchParams.yearRange[1]]
                          : [0, 0]
                      }
                    />
                  </Form.Item>
                </Col>
                {!disableYearRange() && (
                  <SliderRangeLabel span={3}>{searchParams.yearRange[1]}</SliderRangeLabel>
                )}
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
              </AntRow>
            </Col>
          </AntRow>
        </Col>
      </AntRow>
    </Form>
  );
};

export default MovieSearchForm;
