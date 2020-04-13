import React from 'react';
import { ITournament } from '../../interfaces/interfaces';

interface IProps {
  tournament: ITournament;
  // onEdit: () => void; // FROM REDUX
  // onDelete: () => void; // FROM REDUX
}

const Tournament = ({ tournament }: IProps) => {
  return <div>{tournament.name}</div>;
};

export default Tournament;
