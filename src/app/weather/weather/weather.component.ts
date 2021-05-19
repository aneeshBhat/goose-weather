import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {

  error$:Observable<any>;
  mobileView = false;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches})=>{
      console.log(matches)

    })

  );
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    console.log(this.cards);
  }

}
