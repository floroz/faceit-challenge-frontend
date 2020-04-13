import axios from 'axios';
import { RootState } from '../reducers';
import { ITournamentAction } from '../interfaces/interfaces';
import { TournamentActions } from '../enum/TournamentAction';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Dispatch } from 'redux';

export const fetchAllTournaments = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: TournamentActions.FETCH_ALL_TOURNAMENT_START
    });
    const { data: tournaments } = await axios.get(API_TOURNAMENTS_URL);
    console.log(tournaments);
    dispatch({
      type: TournamentActions.FETCH_ALL_TOURNAMENT_SUCCESS,
      payload: tournaments
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: TournamentActions.FETCH_ALL_TOURNAMENT_ERROR,
      payload: error.message
    });
  }
};

export const createTournament = (name: string) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await axios.post(API_TOURNAMENTS_URL, { name });
    console.log(data);
    dispatch({
      type: TournamentActions.CREATE_TOURNAMENT,
      payload: data
    });
  } catch (error) {
    console.error(error.message);
  }
};

// deleteTournament requires the string with the tournament's id to delete
export const deleteTournamentCreator = (payload: string): ITournamentAction => {
  return {
    type: TournamentActions.DELETE_TOURNAMENT,
    payload
  };
};

export const deleteTournament = (id: string) => async (dispatch: Dispatch) => {
  const URL = `${API_TOURNAMENTS_URL}/${id}`;
  try {
    const res = await axios.delete(URL);
    console.log(res);
    dispatch({
      type: TournamentActions.DELETE_TOURNAMENT,
      payload: id
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const editTournament = (id: string, name: string) => async (
  dispatch: Dispatch
) => {
  const URL = `${API_TOURNAMENTS_URL}/${id}`;
  try {
    const { data: tournament } = await axios.patch(URL, { name });
    console.log(tournament);
    dispatch({
      type: TournamentActions.EDIT_TOURNAMENT,
      payload: tournament
    });
  } catch (error) {
    console.error(error.message);
  }
};
