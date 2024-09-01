import { Request, Response } from 'express';
import pool from './db';
import { RowDataPacket } from 'mysql2';

interface Result {
  id: number;
  status: 'Queued' | 'In Progress' | 'Success' | 'Failure';
  repositoryName: string;
  findings: any; // Adjust if necessary
  queuedAt: Date;
  scanningAt: Date;
  finishedAt: Date;
}


export const createResult = async (req: Request, res: Response) => {
  const { status, repositoryName, findings, queuedAt, scanningAt, finishedAt } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO results (status, repositoryName, findings, queuedAt, scanningAt, finishedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [status, repositoryName, JSON.stringify(findings), queuedAt, scanningAt, finishedAt]  
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error creating result' });
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Result[] & RowDataPacket[]>('SELECT * FROM results');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
};

export const getResultById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const [row] = await pool.query<Result[] & RowDataPacket[]>('SELECT * FROM results WHERE id = ?',[id]);
    if (row.length === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.status(200).json(row);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching result' });
  }
};

export const updateResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { repositoryName, status, findings, queuedAt, scanningAt, finishedAt } = req.body;
  console.log("affan");
  try {
    const entries = Object.entries(req.body).filter(([_, value]) => value !== undefined);

  if (entries.length === 0) {
    throw new Error('No fields to update');
  }

  const fields = entries.map(([key, _]) => `${key} = ?`).join(', ');
  const values = entries.map(([key, value]) => 
    key === 'findings' ? JSON.stringify(value) : value
  );

  const query = `
    UPDATE results
    SET ${fields}
    WHERE id = ?
  `;

  values.push(id);
  const result = await pool.query(query, values);
    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: 'Result not found' });
    // }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating result' });
  }
};

export const deleteResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM results WHERE id = ?', [id]);
    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: 'Result not found' });
    // }
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting result' });
  }
};

