import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { ITournament } from '../../interfaces/interfaces';
import TournamentsList from '../TournamentsList/TournamentsList';
import {
  fetchAllTournaments,
  createTournament,
  searchTournament,
  deleteTournament,
  editTournament
} from '../../actions/tournaments';
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

interface IPropsFromRedux {
  fetchAllTournaments: () => void;
  createTournament: (name: string) => void;
  searchTournament: (query: string) => void;
  deleteTournament: (name: string) => void;
  editTournament: (id: string, name: string) => void;
  loading: Boolean;
  error: null | string;
  tournaments: ITournament[] | null;
}

interface IProps extends IPropsFromRedux {}

const Tournaments = ({
  fetchAllTournaments,
  createTournament,
  searchTournament,
  editTournament,
  deleteTournament,
  loading,
  error,
  tournaments
}: IProps) => {
  const [searchInput, setSearchInput] = React.useState('');

  const debouncedSearchTournament = React.useCallback(
    debounce((query: string) => searchTournament(query), 500),
    []
  );

  const onChangeHandler = (e: { target: { value: string } }) => {
    setSearchInput(e.target.value);

    debouncedSearchTournament(e.target.value);
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
        <Button onClick={fetchAllTournaments}>RETRY</Button>
      </StyledError>
    );
  }

  if (loading) {
    render = <H6>Loading tournaments...</H6>;
  }

  if (tournaments && tournaments.length > 0) {
    render = (
      <TournamentsList
        tournaments={tournaments}
        onDelete={deleteTournament}
        onEdit={editTournament}
      />
    );
  } else if (!loading && !error && tournaments?.length === 0) {
    render = <H6>No Results.</H6>;
  }

  return (
    <Container>
      <Group>
        <SearchInput
          value={searchInput}
          onChange={onChangeHandler}
          placeholder="Search tournaments..."
        />
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
  searchTournament,
  deleteTournament,
  editTournament
};

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments);
