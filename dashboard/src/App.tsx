import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmitScanResult from './pages/SubmitScanResult';
import ViewScanResults from './pages/ViewScanResults';
import ViewFindings from './pages/ViewFindings';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SubmitScanResult />} />
          <Route path="/results" element={<ViewScanResults />} />
          <Route path="/findings/:scanId" element={<ViewFindings scanId={8} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
