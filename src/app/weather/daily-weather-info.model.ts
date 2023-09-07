export interface DailyWeatherInfo{
    date: Date,
    weatherCode: string,
    weatherImage: string,
    maxTemperature: number,
    maxApparentTemperature: number,
    minTemperature: number,
    minApparentTemperature: number,
    snowProbability: number,
    rainProbability: number,
}