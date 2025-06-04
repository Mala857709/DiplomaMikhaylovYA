import React, { useState } from 'react';
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

const DataTable: React.FC = () => {
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
      alert('Ошибка при загрузке данных за период');
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
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h4 className="card-title">Данные потребления ресурсов</h4>
            </div>
            <div className="card-body">
              {data && data.timestamp.length > 0 ? (
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Временная метка</th>
                      <th>Электроэнергия (кВт·ч)</th>
                      <th>Вода (м³)</th>
                      <th>Тепло (ГДж)</th>
                      <th>Газ (м³)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.timestamp.map((ts, index) => (
                      <tr key={ts}>
                        <td>{ts}</td>
                        <td className={data.electricity[index] < resourceConfigs.electricity.min || data.electricity[index] > resourceConfigs.electricity.max ? 'out-of-range' : ''}>
                          {data.electricity[index]}
                        </td>
                        <td className={data.water[index] < resourceConfigs.water.min || data.water[index] > resourceConfigs.water.max ? 'out-of-range' : ''}>
                          {data.water[index]}
                        </td>
                        <td className={data.heat[index] < resourceConfigs.heat.min || data.heat[index] > resourceConfigs.heat.max ? 'out-of-range' : ''}>
                          {data.heat[index]}
                        </td>
                        <td className={data.gas[index] < resourceConfigs.gas.min || data.gas[index] > resourceConfigs.gas.max ? 'out-of-range' : ''}>
                          {data.gas[index]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">Нет данных за выбранный период</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;