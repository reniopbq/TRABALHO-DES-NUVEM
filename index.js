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

/*
ROTAS E API PARA CURSOS
*/

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

/*
ROTAS E API PARA PROFESSORES
*/

// Rota para a página de professores
app.get('/professor', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'professor.html'));
});

// API para obter professores
app.get('/api/professor', (req, res) => {
  res.json(professor);
});

// API para adicionar um professor
app.post('/api/professor', (req, res) => {
  const newProfessor = {
    id: professor.length + 1,
    name: req.body.name,
    degree: req.body.degree,
    knowledgeArea: req.body.knowledgeArea,
  };
  professor.push(newProfessor);
  res.json(newProfessor);
});

// API para editar um professor
app.put('/api/professor/:id', (req, res) => {
  const professorId = parseInt(req.params.id);
  const updatedProfessor = {
    id: professorId,
    name: req.body.name,
    degree: req.body.degree,
    knowledgeArea: req.body.knowledgeArea,
  };

  professor = professor.map(professor => professor.id === professorId ? updatedProfessor : professor);
  res.json(updatedProfessor);
});

// API para deletar um professor
app.delete('/api/professor/:id', (req, res) => {
  const professorId = parseInt(req.params.id);
  professor = professor.filter(professor => professor.id !== professorId);
  res.json({ message: 'Professor removido com sucesso' });
});

/*
ROTAS E API PARA ALUNOS
*/

// Rota para a página de alunos
app.get('/estudante', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'estudante.html'));
});

// API para obter alunos
app.get('/api/estudante', (req, res) => {
  res.json(estudante);
});

// API para adicionar um alunos
app.post('/api/estudante', (req, res) => {
  const newStudent = {
    id: estudante.length + 1,
    name: req.body.name,
    registration: req.body.registration,
    grade: req.body.grade,
  };
  estudante.push(newStudent);
  res.json(newStudent);
});

// API para editar um aluno
app.put('/api/estudante/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedStudent = {
    id: studentId,
    name: req.body.name,
    registration: req.body.registration,
    grade: req.body.grade,
  };

  estudante = estudante.map(estudante => estudante.id === studentId ? updatedStudent : estudante);
  res.json(updatedStudent);
});



// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
