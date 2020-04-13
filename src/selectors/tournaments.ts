import { RootState } from '../reducers';
import { createSelector } from 'reselect';
import { ITournamentState } from '../interfaces/interfaces';

const rootTournamentSelector = (state: RootState) => state.tournaments;

export const tournamentListSelector = createSelector(
  rootTournamentSelector,
  (tournaments: ITournamentState) => tournaments.tournaments
);
export const loadingTournamentSelector = createSelector(
  rootTournamentSelector,
  (tournaments: ITournamentState) => tournaments.loading
);
export const errorTournamentSelector = createSelector(
  rootTournamentSelector,
  (tournaments: ITournamentState) => tournaments.error
);
