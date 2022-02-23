import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

const TitleText = styled(Title)`
  font-weight: bold;
  line-height: 1.1;
`;
const BodyText = styled(Text)``;

export { TitleText, BodyText };
