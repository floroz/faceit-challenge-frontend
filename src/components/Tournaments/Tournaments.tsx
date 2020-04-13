import React from 'react';
import TournamentsList from '../TournamentsList/TournamentsList';

interface IProps {}

const Tournaments = (props: IProps) => {
  // Contains the search functionalities
  // Contains the 'Create Tournaments Button
  // Pass down the list of tournaments based on search filter

  return (
    <div>
      <TournamentsList />
    </div>
  );
};

export default Tournaments;
