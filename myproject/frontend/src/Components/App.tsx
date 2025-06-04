import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import RealTimeCharts from './RealTimeCharts';
import PeriodCharts from './PeriodCharts';
import DataTable from './DataTable';

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<RealTimeCharts />} />
        <Route path="/period-charts" element={<PeriodCharts />} />
        <Route path="/table" element={<DataTable />} />
      </Routes>
    </Router>
  );
};

export default App;