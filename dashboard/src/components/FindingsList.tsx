import React,{useState,useEffect} from 'react';
import './styles/List.css';

export interface Finding {
  ruleId: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | "Critical";
  path: string;
}

const FindingsList: React.FC<{ scanId: number  }> = ({ scanId }) => {

    const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    const fetchFindings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/results/${scanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch findings');
        }
        const data = await response.json();
        if(typeof data[0].findings !== undefined)
        {
            setFindings([...findings,JSON.parse(data[0].findings)]);
        }
        console.log(typeof findings);
      } catch (error) {
        console.error(error);
        alert('Error fetching findings');
      }
    };

    fetchFindings();
  }, [scanId]);
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Rule ID</th>
          <th>Description</th>
          <th>Severity</th>
          <th>Path : Line Number</th>
        </tr>
      </thead>
      <tbody>
        { findings && findings.map((finding, index) => (
          <tr key={index}>
            <td>{finding.ruleId}</td>
            <td>{finding.description}</td>
            <td><span >{finding.severity}</span></td>
            <td>{finding.path}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FindingsList;
