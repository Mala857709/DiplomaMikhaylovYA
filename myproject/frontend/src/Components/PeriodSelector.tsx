import React, { useState } from 'react';

interface PeriodSelectorProps {
  onSubmit: (start: string, end: string) => void;
  onExport: (start: string, end: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onSubmit, onExport }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(start, end);
  };

  const handleExport = () => {
    onExport(start, end);
  };

  return (
    <div className="card my-4">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title">Выбор периода данных</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-5">
            <label className="form-label">Дата и время начала:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Дата и время окончания:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">Применить</button>
          </div>
        </form>
        <div className="col-md-2 d-flex align-items-end mt-3">
          <button type="button" className="btn btn-success w-100" onClick={handleExport}>
            Экспорт CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodSelector;