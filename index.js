const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página principal (Home)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página de cursos
app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'courses.html'));
});

// API para obter cursos
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// API para adicionar um curso
app.post('/api/courses', (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
    duration: req.body.duration,
    coordinator: req.body.coordinator,
  };
  courses.push(newCourse);
  res.json(newCourse);
});

// API para editar um curso
app.put('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const updatedCourse = {
    id: courseId,
    name: req.body.name,
    duration: req.body.duration,
    coordinator: req.body.coordinator,
  };

  courses = courses.map(course => course.id === courseId ? updatedCourse : course);
  res.json(updatedCourse);
});

// API para deletar um curso
app.delete('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  courses = courses.filter(course => course.id !== courseId);
  res.json({ message: 'Curso removido com sucesso' });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
