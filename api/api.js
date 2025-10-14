const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let education = [
  { id: 1, year: '2023-2023', institution: 'Harvard Online', degree: 'CS50 Python' },
  { id: 2, year: '2024-3000', institution: 'UFM', degree: 'Computer Science Engineering' }
];

app.get('/education', (req, res) => {
  res.json(education);
});

app.get('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = education.find(e => e.id === id);
  if (!entry) return res.status(404).json({ error: 'Education not found' });
  res.json(entry);
});

app.post('/education', (req, res) => {
  const { year, institution, degree } = req.body;
  if (!year || !institution || !degree) {
    return res.status(422).json({ error: 'Missing required fields (year, institution, degree)' });
  }
  const newId = Math.max(0, ...education.map(e => e.id)) + 1;
  const newEntry = { id: newId, year, institution, degree };
  education.push(newEntry);
  res.status(201).json(newEntry);
});

app.patch('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = education.find(e => e.id === id);
  if (!entry) return res.status(404).json({ error: 'Education not found' });
  const { year, institution, degree } = req.body;
  if (year !== undefined) entry.year = year;
  if (institution !== undefined) entry.institution = institution;
  if (degree !== undefined) entry.degree = degree;
  res.json(entry);
});

app.delete('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = education.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Education not found' });
  const deletedEntry = education.splice(index, 1)[0];
  res.json(deletedEntry);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
