import { TournamentActions } from '../enums/TournamentAction';

export interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: Date;
}

export interface ITournamentState {
  tournaments: ITournament[] | null;
  loading: Boolean;
  error: string | null;
}

export interface ITournamentAction {
  type: TournamentActions;
  payload: any;
}
