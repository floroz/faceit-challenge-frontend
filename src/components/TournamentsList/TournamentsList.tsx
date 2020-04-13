import React from 'react';
import { ITournament } from '../../interfaces/interfaces';
import Tournament from '../Tournament/Tournament';
import { Grid } from './TournamentsList.styles';

interface IProps {
  tournaments: ITournament[];
  onDelete: (name: string) => void;
  onEdit: (id: string, name: string) => void;
}

const TournamentsList = ({ tournaments, onDelete, onEdit }: IProps) => {
  return (
    <Grid>
      {tournaments.map((tournament: ITournament) => (
        <Tournament
          tournament={tournament}
          key={tournament.id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Grid>
  );
};

export default TournamentsList;
