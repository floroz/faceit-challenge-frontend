import React from 'react';
import { ITournament } from '../../interfaces/interfaces';
import { TournamentCard, ButtonGroup } from './Tournament.styles';
import H6 from '../H6';
import Button from '../Button/Button';

interface IProps {
  tournament: ITournament;
  // onEdit: () => void; // FROM REDUX
  // onDelete: () => void; // FROM REDUX
}

const Tournament = ({ tournament }: IProps) => {
  return (
    <TournamentCard>
      <H6>{tournament.name}</H6>
      <p>{tournament.organizer}</p>
      <p>
        {tournament.participants.current}/{tournament.participants.max}
      </p>
      <p>{tournament.organizer}</p>
      <p>Start: {tournament.startDate}</p>
      <ButtonGroup>
        <Button onClick={() => {}}>Edit</Button>
        <Button onClick={() => {}}>Delete</Button>
      </ButtonGroup>
    </TournamentCard>
  );
};

export default Tournament;
