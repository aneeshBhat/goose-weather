import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { City } from '../../models/city/city';
import { LocationData } from '../../models/location-data/location-data';
import { Store, select } from '@ngrx/store';
import USCities from '../../../assets/us_cities.json'; 
import { CurrentConditionsComponent } from '../../cards/current-conditions/current-conditions/current-conditions.component';
import { WeatherDiscussionComponent }  from '../../cards/weather-discussion/weather-discussion/weather-discussion.component';
import { WeeklyForecastComponent} from '../../cards/weekly-forecast/weekly-forecast/weekly-forecast.component';
import { HourlyForecastComponent } from '../../cards/hourly-forecast/hourly-forecast/hourly-forecast.component';
import { AboutDesktopComponent } from '../../cards/about-desktop/about-desktop/about-desktop.component';
import { AboutMobileComponent } from '../../cards/about-mobile/about-mobile/about-mobile.component';
import { RadarDesktopComponent } from '../../cards/radar-desktop/radar-desktop/radar-desktop.component';
import { RadarMobileComponent} from '../../cards/radar-mobile/radar-mobile/radar-mobile.component';
import { WeatherService } from '../weather.service';
import { AppState, selectError } from '../../reducers';
import { LoadLocations } from 'src/app/actions/location.actions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  cardsDesktop = [];
  cardsMobile = [];
  citiesCtrl = new FormControl();
  filteredCities:Observable<City[]>;
  locationData:LocationData = new LocationData();
  cities = [];
  cards:any;
  error$:Observable<any>;
  mobileView = false;

 
  constructor(private breakpointObserver: BreakpointObserver,public weatherService: WeatherService, private store: Store<AppState>) { 
// desktop view
this.cardsDesktop = [
  {
    title: 'Current Conditions',
    cols: 1,
    rows: 1,
    component: CurrentConditionsComponent
  },
  {
    title: 'Hourly Forecast',
    cols: 1,
    rows: 1,
    component: HourlyForecastComponent
  },
  {
    title: 'Weather Discussion',
    cols: 1,
    rows: 2,
    component: WeatherDiscussionComponent
  },
  {
    title: 'Weekly Forecast',
    cols: 2,
    rows: 1,
    component: WeeklyForecastComponent
  },
  {
    title: 'Radar Images',
    cols: 3,
    rows: 1,
    component: RadarDesktopComponent
  },
  {
    title: 'About',
    cols: 3,
    rows: 1,
    component: AboutDesktopComponent
  }
];

// Mobile View
this.cardsMobile = [
  {
    title: 'Current Conditions',
    cols: 3,
    rows: 1,
    component: CurrentConditionsComponent
  },
  {
    title: 'Hourly Forecast',
    cols: 3,
    rows: 1,
    component: HourlyForecastComponent
  },
  {
    title: 'Weather Discussion',
    cols: 3,
    rows: 2,
    component: WeatherDiscussionComponent
  },
  {
    title: 'Weekly Forecast',
    cols: 3,
    rows: 1,
    component: WeeklyForecastComponent
  },
  {
    title: 'Radar Images',
    cols: 3,
    rows: 2,
    component: RadarMobileComponent
  },
  {
    title: 'About',
    cols: 3,
    rows: 1,
    component: AboutMobileComponent
  }
];
    const homeCity: City|any = {
      capital:'',
      state:'',
      latitude:'',
      longtitude:'',
      comninedName:''
    }
    this.cities.push(homeCity);
    const citiesJSON = JSON.stringify(USCities);
    const parsedCities = JSON.parse(citiesJSON);
    parsedCities.forEach((parsedCity) => {
     const city:City|any ={
       capital:parsedCity.capital,
       state:parsedCity.abbr,
       latitude:parsedCity.lat,
       longitude:parsedCity.long,
       combinedName:parsedCity.capital +', ' + parsedCity.abbr
     };
     this.cities.push(city);
     this._filterCities(parsedCity.capital);
  
    });

    this.filteredCities = this.citiesCtrl.valueChanges.pipe(
      startWith(''),
      map(city => city ? this._filterCities(city):this.cities)
    )
   console.log(this.filteredCities)
  }
  private _filterCities(value:string|any):City[]{
    const filterValue = value.toLowerCase();

    return this.cities.filter(city =>city.capital.toLowerCase().indexOf(filterValue)===0)
  }

  ngOnInit(): void {
   
    // this.error$ = this.store
    try {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.savePosition(position)
      });
    } catch(error){
      alert('Browser does not support location services')
    }
  }

  ngAfterViewInit() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({matches})=>{
        console.log(matches)
        if(matches){
          this.mobileView=true;
          return this.cardsMobile;
        } else {
          this.mobileView = false;
          return this.cardsDesktop;
        }
  
      })
  
    );
  }
   savePosition(position){
   this.locationData.latitude = position.coords.latitude.toFixed(4).toString();
   this.locationData.longitude = position.coords.longitude.toFixed(4).toString();
   console.log(this.locationData);
   for(const city of this.cities){
    if(city.combinedName === 'Washington, DC'){
      this.locationData.latitude =city.latitude;
      this.locationData.longitude =city.longitude;
      console.log(city,'city')
    }
    
   }
   this.store.dispatch(new LoadLocations({locationData: this.locationData}))
   }
  onSelectionChanged(event: MatAutocompleteSelectedEvent){
   console.log(event);
  }

}
