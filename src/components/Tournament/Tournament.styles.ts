import theme from '../../theme';
import styled from 'styled-components';

export const TournamentCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: ${theme.palette.background.alt1};
  padding: ${theme.spacing(2)};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > :first-child {
    margin-right: ${theme.spacing(2)};
  }
`;
