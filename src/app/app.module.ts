import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';
import { GallerizeModule } from  '@ngx-gallery/gallerize';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PersonTileComponent } from './components/team/person-tile/person-tile.component';
import { PrismicService } from './services/prismic.service';
import { CommonService } from './services/common.service';
import { ListComponent } from './components/team/list/list.component';
import { TeamComponent } from './components/team/team.component';
import { CasesComponent } from './components/cases/cases.component';
import { CaseTileComponent } from './components/cases/case-tile/case-tile.component';
import { CaseComponent } from './components/cases/case/case.component';
import { CaseRowComponent } from './components/cases/case/case-row/case-row.component';
import { PersonThumbComponent } from './components/team/person-thumb/person-thumb.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRowComponent } from './components/home/home-row/home-row.component';
import { AboutComponent } from './components/about/about.component';
import { CaseResolver } from './resolves/case.resolver';
import { GroupByPipe } from './pipes/group-by';
import { ServicesComponent } from './components/services/services.component';
import { ServiceTileComponent } from './components/services/service-tile/service-tile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PersonTileComponent,
    ListComponent,
    TeamComponent,
    CasesComponent,
    CaseTileComponent,
    CaseComponent,
    CaseRowComponent,
    PersonThumbComponent,
    HomeComponent,
    HomeRowComponent,
    AboutComponent,
    ServicesComponent,
    ServiceTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule,
  ],
  providers: [
    PrismicService,
    CommonService,
    CaseResolver,
    GroupByPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
