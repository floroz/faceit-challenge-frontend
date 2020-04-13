import React from 'react';
import { connect } from 'react-redux';
import { ITournament } from '../../interfaces/interfaces';
import TournamentsList from '../TournamentsList/TournamentsList';
import {
  fetchAllTournaments,
  createTournament,
  searchTournament
} from '../../actions/tournaments';
import throttle from 'lodash.throttle';
import {
  tournamentListSelector,
  loadingTournamentSelector,
  errorTournamentSelector
} from '../../selectors/tournaments';
import { RootState } from '../../reducers';
import { Container } from './Tournaments.styles';
import SearchInput from '../SearchInput/SearchInput';
import Button from '../Button/Button';

interface IProps {
  fetchAllTournaments: () => void;
  createTournament: (name: string) => void;
  searchTournament: (query: string) => void;
  loading: Boolean;
  error: null | string;
  tournaments: ITournament[] | null;
}

const Tournaments = ({
  fetchAllTournaments,
  createTournament,
  searchTournament,
  loading,
  error,
  tournaments
}: IProps) => {
  const [searchInput, setSearchInput] = React.useState('');

  const throttleSearchTournament = React.useCallback(
    throttle((query: string) => searchTournament(query), 750),
    []
  );

  const onChangeHandler = (e: { target: { value: string } }) => {
    setSearchInput(e.target.value);

    throttleSearchTournament(e.target.value);
  };

  const onCreateTournament = () => {
    const name: string | null = prompt('Insert Tournament Name');

    if (!name) return;

    createTournament(name);
  };

  React.useEffect(() => {
    fetchAllTournaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <Container>
      <SearchInput value={searchInput} onChange={onChangeHandler} />
      <Button onClick={onCreateTournament}>Create Tournament</Button>
      {render}
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  tournaments: tournamentListSelector(state),
  loading: loadingTournamentSelector(state),
  error: errorTournamentSelector(state)
});

const mapDispatchToProps = {
  fetchAllTournaments,
  createTournament,
  searchTournament
};

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments);
