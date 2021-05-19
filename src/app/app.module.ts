import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { WeatherComponent } from './weather/weather/weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { AboutDesktopComponent } from './cards/about-desktop/about-desktop/about-desktop.component';
import { AboutMobileComponent } from './cards/about-mobile/about-mobile/about-mobile.component';
import { CurrentConditionsComponent } from './cards/current-conditions/current-conditions/current-conditions.component';
import { HourlyForecastComponent } from './cards/hourly-forecast/hourly-forecast/hourly-forecast.component';
import { RadarDesktopComponent } from './cards/radar-desktop/radar-desktop/radar-desktop.component';
import { RadarMobileComponent } from './cards/radar-mobile/radar-mobile/radar-mobile.component';
import { WeatherDiscussionComponent } from './cards/weather-discussion/weather-discussion/weather-discussion.component';
import { WeeklyForecastComponent } from './cards/weekly-forecast/weekly-forecast/weekly-forecast.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    PageNotFoundComponent,
    AboutDesktopComponent,
    AboutMobileComponent,
    CurrentConditionsComponent,
    HourlyForecastComponent,
    RadarDesktopComponent,
    RadarMobileComponent,
    WeatherDiscussionComponent,
    WeeklyForecastComponent,
    
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
