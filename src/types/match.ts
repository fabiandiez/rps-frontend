import { Move } from "./move";

export interface Match {
  id: string;
  playerId: string;
  myScore: number;
  opponentScore: number;
  myMove: Move;
  opponentMove: Move;
  currentRound: number;
}
