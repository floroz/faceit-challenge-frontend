import theme from '../../theme';
import styled from 'styled-components';

export const TournamentCard = styled.div`
  background-color: ${theme.palette.background.alt1};
  padding: ${theme.spacing(2)};

  p {
    margin-bottom: ${theme.spacing(1)};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > :first-child {
    margin-right: ${theme.spacing(2)};
  }
`;
