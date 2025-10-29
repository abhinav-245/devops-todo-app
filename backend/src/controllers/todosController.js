import { pool } from "../db/db.js";

export const getTodos = async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  res.json(result.rows);
};

export const addTodo = async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0]);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id]);
  res.json({ message: "Todo updated" });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.json({ message: "Todo deleted" });
};
