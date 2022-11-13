import { Component, OnInit } from '@angular/core';
import { MatchService } from "../match.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private matchService: MatchService) { }

  ngOnInit(): void {
  }

  createMatch(): void {
    this.matchService.createMatch().subscribe(
      {
        next: (match) => {
          console.log('match received', match);
          this.router.navigate(['/match', match.id]).then();
        },
        error: (error) => {
          console.error('error caught in component', error)
        }
      }
    )
  }
}
