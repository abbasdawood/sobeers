import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './components/team/team.component';
import { CasesComponent } from './components/cases/cases.component';
import { CaseComponent } from './components/cases/case/case.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CaseResolver } from './resolves/case.resolver';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'team', component: TeamComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'work', component: CasesComponent },
  { path: 'work/:id/:slug', component: CaseComponent, resolve: {case: CaseResolver} },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
