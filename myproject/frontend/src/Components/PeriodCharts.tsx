import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import PeriodSelector from './PeriodSelector';

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

const PeriodCharts: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  const handleSubmit = async (start: string, end: string) => {
    try {
      const params = new URLSearchParams();
      if (start) params.append('start_datetime', start);
      if (end) params.append('end_datetime', end);
      const url = `/charts-period/?${params.toString()}`;
      const response = await fetch(url);
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
      alert('Ошибка загрузки данных за период');
    }
  };

  const handleExport = (start: string, end: string) => {
    const params = new URLSearchParams();
    if (start) params.append('start_datetime', start);
    if (end) params.append('end_datetime', end);
    const url = `/export-csv/?${params.toString()}`;
    window.location.href = url;
  };

  return (
    <div className="container-fluid">
      <div className="row my-4">
        <div className="col-md-8 mx-auto">
          <PeriodSelector onSubmit={handleSubmit} onExport={handleExport} />
        </div>
      </div>
      {data && data.timestamp.length > 0 ? (
        <>
          <div className="row mb-4">
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
          <div className="row mb-4">
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
        </>
      ) : (
        <div className="text-center">Нет данных за выбранный период</div>
      )}
    </div>
  );
};

export default PeriodCharts;