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
import { Container, Group, StyledError } from './Tournaments.styles';
import H6 from '../H6';
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

  let render;

  if (error) {
    render = (
      <StyledError>
        <H6>Something Went Wrong...</H6>
        <Button onClick={fetchAllTournaments}>Try Again</Button>
      </StyledError>
    );
  }

  if (loading) {
    render = <H6>Loading...</H6>;
  }

  if (tournaments && tournaments.length > 0) {
    render = <TournamentsList tournaments={tournaments} />;
  }

  return (
    <Container>
      <Group>
        <SearchInput value={searchInput} onChange={onChangeHandler} />
        <Button onClick={onCreateTournament}>Create Tournament</Button>
      </Group>
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
