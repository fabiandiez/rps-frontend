import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatchService } from "../match.service";
import { Match } from "../../types/match";
import { Move } from "../../types/move";
import { LocalService } from "../local.service";
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  public match?: Match;

  public playerId: string = '';

  public isPlayerOne = true;

  private matchId = String(this.route.snapshot.paramMap.get('id'));

  private updateSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService,
    public matchService: MatchService,
  ) { }

  ngOnInit(): void {
    const playerId = this.localService.getData(this.matchId);
    if (playerId) {
      this.matchService.getMatch(this.matchId, playerId).subscribe(match => this.match = match);
      this.playerId = playerId;
      console.log('getting match', this.match);
    } else {
      this.matchService.joinMatch(this.matchId).subscribe(match => {
        this.match = match
        this.playerId = match.playerId;
      });
      this.isPlayerOne = false;
      console.log('joined match', this.match);
    }
    this.updateSubscription = interval(1000).subscribe(() => {
      if (!this.match?.myMove || !this.match?.opponentMove) {
        this.matchService.getMatch(this.matchId, this.playerId).subscribe(match => this.match = match);
      }
    })
  }

  playMove(move: string): void {
    console.log('playing move', move);
    this.matchService.playMove(this.matchId, this.playerId, move as Move).subscribe(match => this.match = match);
  }

  mapMove(move: Move): string {
    switch (move) {
      case Move.ROCK:
        return '🪨';
      case Move.PAPER:
        return '📜';
      case Move.SCISSORS:
        return '✂️';
    }
  }

}
