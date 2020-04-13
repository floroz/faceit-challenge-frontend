import React from 'react';
import { connect } from 'react-redux';
import { ITournament } from '../../interfaces/interfaces';
import TournamentsList from '../TournamentsList/TournamentsList';
import { fetchAllTournaments } from '../../actions/tournaments';
import debounce from 'lodash.debounce';
import {
  tournamentListSelector,
  loadingTournamentSelector,
  errorTournamentSelector
} from '../../selectors/tournaments';
import { RootState } from '../../reducers';

interface IProps {
  fetchAllTournaments: Function;
  loading: Boolean;
  error: null | string;
  tournaments: ITournament[] | null;
}

const Tournaments = ({
  fetchAllTournaments,
  loading,
  error,
  tournaments
}: IProps) => {
  // Contains the search functionalities
  // Contains the 'Create Tournaments Button
  // Pass down the list of tournaments based on search filter
  React.useEffect(() => {
    fetchAllTournaments();
  }, []);

  const searchTournament = debounce(() => {}, 300);

  let render = null;

  if (error) {
    render = <div>Error.. {error}</div>;
  }

  if (loading) {
    render = <div>Loading...</div>;
  }

  if (tournaments && tournaments.length > 0) {
    render = <TournamentsList tournaments={tournaments} />;
  }

  return <div>{render}</div>;
};

const mapStateToProps = (state: RootState) => ({
  tournaments: tournamentListSelector(state),
  loading: loadingTournamentSelector(state),
  error: errorTournamentSelector(state)
});

const mapDispatchToProps = {
  fetchAllTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments);
