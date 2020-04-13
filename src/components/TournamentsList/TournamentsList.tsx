import React from 'react';
import { ITournament } from '../../interfaces/interfaces';
import Tournament from '../Tournament/Tournament';

interface IProps {
  tournaments: ITournament[];
}

const TournamentsList = ({ tournaments }: IProps) => {
  // receives the tournaments list and render each tournament component
  return (
    <div>
      {tournaments.map((tournament: ITournament) => (
        <Tournament tournament={tournament} key={tournament.id} />
      ))}
    </div>
  );
};

export default TournamentsList;
