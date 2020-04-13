import {
  ITournamentState,
  ITournamentAction,
  ITournament
} from '../interfaces/interfaces';
import { TournamentActions } from '../enums/TournamentAction';

const initialState: ITournamentState = {
  tournaments: null,
  loading: false,
  error: null
};

export default function tournaments(
  state: ITournamentState = initialState,
  action: ITournamentAction
) {
  switch (action.type) {
    case TournamentActions.FETCH_ALL_TOURNAMENT_START:
      return {
        ...state,
        loading: true
      };
    case TournamentActions.FETCH_ALL_TOURNAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tournaments: action.payload
      };
    case TournamentActions.FETCH_ALL_TOURNAMENT_ERROR:
      return {
        ...state,
        loading: false,
        tournaments: null,
        error: action.payload
      };
    case TournamentActions.SEARCH_TOURNAMENT_START:
      return {
        ...state,
        loading: true,
        error: null,
        tournaments: null
      };
    case TournamentActions.SEARCH_TOURNAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tournaments: action.payload
      };
    case TournamentActions.SEARCH_TOURNAMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case TournamentActions.CREATE_TOURNAMENT:
      const tournaments = state.tournaments || [];
      return {
        ...state,
        tournaments: tournaments.concat(action.payload)
      };
    case TournamentActions.EDIT_TOURNAMENT:
      // check there are tournaments or invalid
      if (!state.tournaments) return state;
      // create immutable objects
      const newState = { ...state, tournaments: state.tournaments.slice() };
      // find index of tournament to replace
      const indexOfTournament = newState.tournaments.findIndex(
        el => el.id === action.payload.id
      );
      // replace with edited tournaments coming from api
      newState.tournaments[indexOfTournament] = action.payload;
      return {
        ...newState
      };
    case TournamentActions.DELETE_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments?.filter(
          (tourn: ITournament) => tourn.id !== action.payload
        )
      };
    default:
      return state;
  }
}
