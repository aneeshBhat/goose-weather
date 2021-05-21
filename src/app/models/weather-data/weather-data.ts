import { CurrentCondtions } from '../current-condtitions/current-condtions';
import { HourlyForecast } from '../hourly-forecast/hourly-forecast';
import { WeeklyForecast } from '../weakly-forecast/weekly-forecast';

export class WeatherData {
    forecastURL = '';
  forecast: {};
  currentConditions: CurrentCondtions = new CurrentCondtions();
  weeklyForecast: WeeklyForecast[] = [];
  hourlyForecast: HourlyForecast[] = [];
  NoaaWeeklyForecastUrl = '';
  NoaaHourlyForecastUrl = '';
  errorMessage = '';
  weatherDate: Date = new Date();
}
