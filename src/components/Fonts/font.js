import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

const TitleText = styled(Title)`
  font-weight: bold;
  line-height: 1.1;
`;
const BodyText = styled(Text)`
  ${({ sm }) =>
    sm === true &&
    `
    font-size:0.7rem;
    
    `}
  color: ${({ color }) => color};
`;

export { TitleText, BodyText };
