import theme from '../../theme';
import styled from 'styled-components';

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${theme.spacing(4)};
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
`;
