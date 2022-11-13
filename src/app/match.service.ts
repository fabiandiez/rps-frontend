import { Injectable } from '@angular/core';
import { Match } from "../types/match";
import { Observable, of, catchError, tap } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { LocalService } from "./local.service";
import { Move } from "../types/move";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient, private localService: LocalService) { }

  private baseUrl = 'http://localhost:8080/api/v1/match';

  getMatch(matchId: string, playerId: string): Observable<Match> {
    const url = `${this.baseUrl}/${matchId}`;

    const params = new HttpParams()
      .set('playerId', playerId);
    return this.http.get<Match>(url, {params}).pipe(
      catchError(this.handleError<Match>(`getMatch id=${matchId}`))).pipe(
    );
  }

  createMatch(): Observable<Match> {
    return this.http.post<Match>(this.baseUrl, null).pipe(
      tap(match => this.localService.saveData(match.id, match.playerId))
    );
  }

  joinMatch(matchId: string): Observable<Match> {
    const url = `${this.baseUrl}/${matchId}`;
    return this.http.put<Match>(url, null).pipe(
      catchError(this.handleError<Match>('joinMatch'))).pipe(
      tap(match => this.localService.saveData(match.id, match.playerId))
    );
  }

  playMove(matchId: string, playerId: string, move: Move): Observable<Match> {
    const url = `${this.baseUrl}/${matchId}/moves`;
    console.log('hitting url', url);
    const params = new HttpParams()
      .set('playerId', playerId)
      .set('move', move);
    console.log('playing move', move);
    console.log('playing move', params);
    return this.http.put<Match>(url, null, {params}).pipe(
      catchError(this.handleError<Match>('playMove'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Gracefully handle errors
      console.error(error);

      return of(result as T);
    };
  }
}
