import React, {useState, useEffect} from 'react';
import './styles/List.css';
import Badge from './Badge';

export interface ScanResult {
  id: number;
  repositoryName: string;
  status: 'Queued' | 'In Progress' | 'Success' | 'Failure';
  findings: any[];
  queuedAt: string;
}

const ScanResultList: React.FC = () => {

    const [results, setResults] = useState<ScanResult[]>([]);

    useEffect(() => {
      const fetchResults = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/results');
          if (!response.ok) {
            throw new Error('Failed to fetch scan results');
          }
          const data = await response.json();
          setResults(data);
          console.log(data);
        } catch (error) {
          console.error(error);
          alert('Error fetching scan results');
        }
      };
  
      fetchResults();
    }, []);
  
    return (
      <>
        <table className="table">
            <thead>
            <tr>
                <th>Repository Name</th>
                <th>Status</th>
                <th>Findings</th>
                <th>Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {results.map((result) => (
                <tr key={result.id}>
                <td>{result.repositoryName}</td>
                <td><span >{result.status}</span></td>
                <td><span >{result.findings}</span></td>
                <td>{result.queuedAt}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {results.map((result) => (
            <div>
            <div key={result.id}>
                <Badge label={result.repositoryName} fields={[result.status]}/>
            </div>
            <br />
          </div>
        ))}
    </>
  );
};

export default ScanResultList;
