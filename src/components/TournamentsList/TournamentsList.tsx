import React from 'react';
import { ITournament } from '../../interfaces/interfaces';
import Tournament from '../Tournament/Tournament';
import { Grid } from './TournamentsList.styles';

interface IProps {
  tournaments: ITournament[];
}

const TournamentsList = ({ tournaments }: IProps) => {
  // receives the tournaments list and render each tournament component
  return (
    <Grid>
      {tournaments.map((tournament: ITournament) => (
        <Tournament tournament={tournament} key={tournament.id} />
      ))}
    </Grid>
  );
};

export default TournamentsList;
