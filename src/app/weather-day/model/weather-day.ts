export interface WeatherDay {
  date: Date;
  description: string;
  img: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  wind_sp: number;
  wind_dir: string;
}
