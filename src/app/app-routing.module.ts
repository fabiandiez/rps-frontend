import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MatchComponent } from "./match/match.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'match/:id', component: MatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
