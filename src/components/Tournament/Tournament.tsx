import React from 'react';
import { ITournament } from '../../interfaces/interfaces';
import { TournamentCard, ButtonGroup } from './Tournament.styles';
import H6 from '../H6';
import Button from '../Button/Button';

interface IProps {
  tournament: ITournament;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const Tournament = ({ tournament, onDelete, onEdit }: IProps) => {
  const editTournament = () => {
    const newName = prompt('Edit name');
    if (!newName) return;
    onEdit(tournament.id, newName);
  };

  const deleteTournament = () => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      onDelete(tournament.id);
    }
  };

  const startDateLocale = new Date(tournament.startDate).toLocaleDateString(
    'en-GB',
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  );

  return (
    <TournamentCard>
      <H6>{tournament.name}</H6>
      <p>{tournament.organizer}</p>
      <p>
        {tournament.participants.current}/{tournament.participants.max}
      </p>
      <p>{tournament.organizer}</p>
      <p>Start: {startDateLocale}</p>
      <ButtonGroup>
        <Button onClick={editTournament}>Edit</Button>
        <Button onClick={deleteTournament}>Delete</Button>
      </ButtonGroup>
    </TournamentCard>
  );
};

export default Tournament;
