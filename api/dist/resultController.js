"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResult = exports.updateResult = exports.getResultById = exports.getResults = exports.createResult = void 0;
const db_1 = __importDefault(require("./db"));
const createResult = async (req, res) => {
    const { status, repositoryName, findings, queuedAt, scanningAt, finishedAt } = req.body;
    try {
        const result = await db_1.default.query('INSERT INTO results (status, repositoryName, findings, queuedAt, scanningAt, finishedAt) VALUES (?, ?, ?, ?, ?, ?)', [status, repositoryName, JSON.stringify(findings), queuedAt, scanningAt, finishedAt]);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating result' });
    }
};
exports.createResult = createResult;
const getResults = async (req, res) => {
    try {
        const [rows] = await db_1.default.query('SELECT * FROM results');
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching results' });
    }
};
exports.getResults = getResults;
const getResultById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const [row] = await db_1.default.query('SELECT * FROM results WHERE id = ?', [id]);
        if (row.length === 0) {
            return res.status(404).json({ error: 'Result not found' });
        }
        res.status(200).json(row);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching result' });
    }
};
exports.getResultById = getResultById;
const updateResult = async (req, res) => {
    const { id } = req.params;
    const { repositoryName, status, findings, queuedAt, scanningAt, finishedAt } = req.body;
    console.log("affan");
    try {
        const entries = Object.entries(req.body).filter(([_, value]) => value !== undefined);
        if (entries.length === 0) {
            throw new Error('No fields to update');
        }
        const fields = entries.map(([key, _]) => `${key} = ?`).join(', ');
        const values = entries.map(([key, value]) => key === 'findings' ? JSON.stringify(value) : value);
        const query = `
    UPDATE results
    SET ${fields}
    WHERE id = ?
  `;
        values.push(id);
        const result = await db_1.default.query(query, values);
        // if (result.rows.length === 0) {
        //   return res.status(404).json({ error: 'Result not found' });
        // }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating result' });
    }
};
exports.updateResult = updateResult;
const deleteResult = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query('DELETE FROM results WHERE id = ?', [id]);
        // if (result.rows.length === 0) {
        //   return res.status(404).json({ error: 'Result not found' });
        // }
        res.status(200).json({ message: 'Result deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting result' });
    }
};
exports.deleteResult = deleteResult;
