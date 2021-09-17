import { useState, useLayoutEffect } from 'react';

import { Line } from 'react-chartjs-2';
import { getLocalHour } from '../../utils/functions'

import { Search } from '../Search';
import { Spinner } from '../Spinner'

import { Place, WeatherData } from '../../types/interfaces'

import { Content } from "./styles";

interface SidebarProps {
  setCurrentPlace: (params: Place) => void;
  weatherData: WeatherData;
  loading: boolean;
  error: boolean;
}

export function Sidebar({ setCurrentPlace, weatherData, loading, error }: SidebarProps) {
  const [chartData, setChartData] = useState({});

  useLayoutEffect(() => {
    (function settingChart() {
      if (!weatherData.timezone) return;

      const currentHour = getLocalHour(weatherData.timezone);

      const hours = []; 

      for (let i = 2; hours.length < 6; i += 2) {
        const newHour = Number(currentHour) + i;
        if(newHour >= 24 ) {
          const rest = newHour % 24;
          hours.push(0 + rest.toString() + ':00');
        } else {
          hours.push(newHour.toString() + ':00');
        }
      }

      const data = weatherData.hourly.slice(0, 12);
      const temps = data
        .filter((data, index) => (index % 2 === 0 ? false : data))
        .map((data) => Math.round(data.temp));

      setChartData({
        labels: hours,
        datasets: [
          {
            fill: true,
            label: ' °C Temperature',
            data: temps,
            backgroundColor: [
              'rgba(255, 255, 255, 0.5)'
            ],
            borderColor: '#FFF',
            borderWidth: 3,
          }
        ]
      });

    })();
  }, [weatherData]);

  function calcDates(index: number) {
    const date = new Date(); 

    const currentDay = date.getDate();
    const daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const rest = (currentDay + index + 1) - daysInCurrentMonth;
    const actualDay = rest >= 0 ? rest : (currentDay + index + 1);

    const currentWeekday = date.toLocaleString('en-US', { weekday: "short" });    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
    const weekdayIndex = weekdays.findIndex(day => day === currentWeekday);
    const actualWeekday = weekdays[weekdayIndex + index + 1];
    
    return {actualDay, actualWeekday}
  }

  return (
    <Content>
      <Search setCurrentPlace={setCurrentPlace} />

      <div className="separator"></div>

      <h1 className="heading">Weather Details</h1>

      {loading ? <Spinner /> : !error && (
        <div className="container-flex-dual">
          <div>
            <span>Cloudy</span>
            <span>{weatherData.current.clouds}%</span>
          </div>
          <div>
            <span>Humidity</span>
            <span>{weatherData.current.humidity}%</span>
          </div>
          <div>
            <span>Wind</span>
            <span>{(weatherData.current.wind_speed * 3.6).toFixed(1)}km/h</span>
          </div>
          <div>
            <span>Rain</span>
            <span>{weatherData.current.rain?.['1h'] || '0'}mm</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="separator"></div>

          <h1 className="heading">Next Hours</h1>

          <div className="container-chart">
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                tension: 0.5, 
                title: {
                  text: 'Local time',
                  display: true
                },
                plugins: {
                  legend: {
                    labels: {
                      color: "#FFF",
                      font: {
                        size: 14,
                      },
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: {
                      color: '#FFF',
                    },
                    grid: {
                      display: false,
                    }
                },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#FFF',
                    },
                    grid: {
                      display: false,
                    }
                },
              },
              }} 
            />
          </div>

          <div className="separator"></div>

          <h1 className="heading">Next Days</h1>

          <div className="container-flex-column">
            {weatherData.daily.map((data, index) => {
              const { actualDay, actualWeekday  } = calcDates(index);
              return (
                <div key={data.sunrise}>
                  <div className="date-box">
                    <span>{actualDay}</span>
                    <span>{actualWeekday}</span>
                  </div>
                  <div className="temperatures">
                    <div>
                      <i className="fas fa-long-arrow-alt-down"></i>
                      <span>{Math.round(data.temp.max)}°</span>
                    </div>
                    <div>
                      <i className="fas fa-long-arrow-alt-up"></i>
                      <span>{Math.round(data.temp.min)}°</span>
                    </div>
                  </div>
                  <div className="rain">
                    <i className="fas fa-tint"></i>
                    <span>{data.rain ? data.rain.toFixed(1) : '0'}mm</span>
                  </div>
                  <p className="description">{data.weather[0].description}.</p>
              </div>
              );
            })}
          </div>
        </>
      )}

    </Content>
  );
}
