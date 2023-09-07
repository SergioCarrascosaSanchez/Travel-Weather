export interface WeatherResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
      time: string;
      weathercode: string,
      temperature_2m_max: string;
      temperature_2m_min: string;
      apparent_temperature_max: string,
      apparent_temperature_min: string,
      precipitation_sum: string;
      rain_sum: string;
      snowfall_sum: string;
    };
    daily: {
      time: string[];
      weathercode: number[],
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      apparent_temperature_max: number[],
      apparent_temperature_min: number[],
      precipitation_sum: number[];
      rain_sum: number[];
      snowfall_sum: number[];
    };
  }