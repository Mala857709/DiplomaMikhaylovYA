import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';

interface Data {
  timestamp: string[];
  electricity: number[];
  water: number[];
  heat: number[];
  gas: number[];
}

const resourceConfigs = {
  electricity: {
    label: 'Электроэнергия (кВт·ч)',
    min: 100,
    max: 500,
    color: 'rgba(40, 167, 69, 0.8)',
    yMin: 0,
    yMax: 600,
  },
  water: {
    label: 'Вода (м³)',
    min: 5,
    max: 20,
    color: 'rgba(23, 162, 184, 0.8)',
    yMin: 0,
    yMax: 30,
  },
  heat: {
    label: 'Тепло (ГДж)',
    min: 50,
    max: 200,
    color: 'rgba(255, 193, 7, 0.8)',
    yMin: 0,
    yMax: 250,
  },
  gas: {
    label: 'Газ (м³)',
    min: 10,
    max: 50,
    color: 'rgba(220, 53, 69, 0.8)',
    yMin: 0,
    yMax: 60,
  },
};

const RealTimeCharts: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/get-data/');
        if (!response.ok) throw new Error('Network response was not ok');
        const fetchedData: Data = await response.json();
        const reversedData = {
          timestamp: fetchedData.timestamp.slice().reverse(),
          electricity: fetchedData.electricity.slice().reverse(),
          water: fetchedData.water.slice().reverse(),
          heat: fetchedData.heat.slice().reverse(),
          gas: fetchedData.gas.slice().reverse(),
        };
        setData(reversedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="container-fluid">Загрузка...</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">Электроэнергия</div>
            <div className="card-body">
              <ChartComponent
                labels={data.timestamp}
                data={data.electricity}
                min={resourceConfigs.electricity.min}
                max={resourceConfigs.electricity.max}
                label={resourceConfigs.electricity.label}
                color={resourceConfigs.electricity.color}
                yMin={resourceConfigs.electricity.yMin}
                yMax={resourceConfigs.electricity.yMax}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white">Вода</div>
            <div className="card-body">
              <ChartComponent
                labels={data.timestamp}
                data={data.water}
                min={resourceConfigs.water.min}
                max={resourceConfigs.water.max}
                label={resourceConfigs.water.label}
                color={resourceConfigs.water.color}
                yMin={resourceConfigs.water.yMin}
                yMax={resourceConfigs.water.yMax}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-dark">Тепло</div>
            <div className="card-body">
              <ChartComponent
                labels={data.timestamp}
                data={data.heat}
                min={resourceConfigs.heat.min}
                max={resourceConfigs.heat.max}
                label={resourceConfigs.heat.label}
                color={resourceConfigs.heat.color}
                yMin={resourceConfigs.heat.yMin}
                yMax={resourceConfigs.heat.yMax}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-danger text-white">Газ</div>
            <div className="card-body">
              <ChartComponent
                labels={data.timestamp}
                data={data.gas}
                min={resourceConfigs.gas.min}
                max={resourceConfigs.gas.max}
                label={resourceConfigs.gas.label}
                color={resourceConfigs.gas.color}
                yMin={resourceConfigs.gas.yMin}
                yMax={resourceConfigs.gas.yMax}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCharts;