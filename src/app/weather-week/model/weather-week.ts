export interface WeatherWeek {
  date: Date;
  temp_day: number;
  temp_night: number;
  temp_min: number;
  temp_max: number;
  temp_morn: number;
  temp_eve: number;
  pressure: number;
  humidity: number;
  description: string;
  img: string;
  wind_sp: number;
  wind_dir: string;
}
