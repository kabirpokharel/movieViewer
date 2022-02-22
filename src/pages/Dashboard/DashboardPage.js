import React from 'react';
import styled from 'styled-components';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { colors } from '../../constants/styleConstants';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { Form, Row, Col, Input, Radio, Slider } from 'antd';

const AntRow = styled(Row)`
  input {
    color: ${({ color }) => color};
  }
  .ant-input-lg {
    font-size: 1.2rem;
  }
  .ant-form-item-label {
    padding-bottom: 0;
  }
  .ant-form-item-label {
    & > label {
      color: ${({ color }) => color};
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
    // border-color: ${() => colors.GREY_COLOR_2};
    &:focus {
      box-shadow: none;
      border-color: none;
    }
  }
`;
const DashboardPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <HeaderComponent bg={colors.GREY_COLOR_1}>
      <Form
        name="searchMovie_form"
        layout="vertical"
        initialValues={
          {
            // remember: true
          }
        }
        onFinish={onFinish}>
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
                    style={{ fontSize: '1.2rem', paddingRight: '0.5rem', color: colors.white }}
                  />
                }
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <AntRow justify="end" color={colors.white}>
              <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                <Form.Item label="YEAR" style={{ marginBottom: 0 }} name="yearRange"></Form.Item>
                <AntRow>
                  <Col
                    span={3}
                    style={{ display: 'flex', alignItems: 'center', color: colors.white }}>
                    1999
                  </Col>
                  <Col span={18}>
                    <Slider range defaultValue={[20, 50]} />
                  </Col>
                  <Col
                    span={3}
                    style={{ display: 'flex', alignItems: 'center', color: colors.white }}>
                    2000
                  </Col>
                </AntRow>
              </Col>
              <Col xs={{ span: 12 }} lg={{ span: 7 }}>
                <AntRow justify="end">
                  <Form.Item label="TYPE" style={{ marginBottom: 0 }} name="videoType">
                    <Radio.Group>
                      <Radio value="any">Any</Radio>
                      <Radio value="movies">Movies</Radio>
                      <Radio value="series">Series</Radio>
                      <Radio value="episodes">Episodes</Radio>
                    </Radio.Group>
                  </Form.Item>
                </AntRow>
              </Col>
            </AntRow>
          </Col>
        </AntRow>
      </Form>
    </HeaderComponent>
  );
};

export default DashboardPage;
