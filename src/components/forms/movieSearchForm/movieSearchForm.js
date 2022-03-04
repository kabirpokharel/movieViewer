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
import { AntRow, SliderRangeLabel } from './styledMovieSearchForm';
import getMovieYearRange from '../../../helpers/getMovieYearRange';

const MovieSearchForm = () => {
  const [form] = Form.useForm();
  const {
    movieListContext: { movieListDispatch, movieListState }
  } = useContext(GlobalContext);
  const { searchParams, movieList } = movieListState;
  console.log('this is movileListState  - --> ', movieListState);
  const disableYearRange = () => {
    let result = false;
    if (isEmpty(movieListState.searchParams)) {
      result = true;
    } else if (isEmpty(movieListState.searchParams.yearRange)) {
      result = true;
    }
    return result;
  };
  const getYearRange = (valueType) => {
    if (isEmpty(movieList)) {
      return 0;
    }
    const { min, max } = getMovieYearRange(movieList.Search);
    if (valueType === 'min') {
      return min;
    } else return max;
  };
  const onFinishFunc = (values) => {
    console.log('this is form values', values);
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
        // yearRange: !disableYearRange()
        //   ? [searchParams.yearRange[0], searchParams.yearRange[1]]
        //   : [0, 0],
        yearRange: [0, 0],
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
                      onChange={submitForm}
                      disabled={disableYearRange()}
                      range={true}
                      defaultValue={[0, 0]}
                      min={getYearRange('min')}
                      max={getYearRange('max')}
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
