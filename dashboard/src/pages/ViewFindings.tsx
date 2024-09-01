import React, { useState, useEffect } from 'react';
import FindingsList, {Finding} from '../components/FindingsList';
import '../components/styles/App.css';

const ViewFindings: React.FC<{ scanId: number }> = ({ scanId }) => {

  return (
    <div className="container">
      <h2>Findings</h2>
      <FindingsList scanId={scanId} />
    </div>
  );
};

export default ViewFindings;
