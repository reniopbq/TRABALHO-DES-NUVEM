
const BACK4APP_STUDENT_API_URL = 'https://parseapi.back4app.com/classes/Estudante';
const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'MzNwrAESFKCmnIKByGsd2Q7b2ZcIqD2yq6PR2bBV', 
  'X-Parse-REST-API-Key': '10YhxYRKR67BQzFd05sDYMqovXwCfQjnngUzOYzu', 
  'Content-Type': 'application/json'
};


document.addEventListener('DOMContentLoaded', () => {
  const studentList = document.getElementById('studentList');
  const studentForm = document.getElementById('studentForm');

  // Função para carregar aluno
  const loadStudents = async () => {
    try {
      const response = await fetch(BACK4APP_STUDENT_API_URL, {
        headers: BACK4APP_HEADERS,
      });
      const data = await response.json();
      const students = data.results; // O Back4App retorna os dados em "results"
      studentList.innerHTML = '';
      students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${student.name} (ID: ${student.registration}) - Média = ${student.grade}
          <button onclick="deleteStudent('${student.objectId}')">Remover</button>
        `;
        studentList.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar os alunos:', error);
    }
  };

  // Função para deletar aluno
  window.deleteStudent = async (id) => {
    try {
      await fetch(`${BACK4APP_STUDENT_API_URL}/${id}`, {
        method: 'DELETE',
        headers: BACK4APP_HEADERS,
      });
      loadStudents();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  //Função cadastrar aluno
  studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('studentName').value;
  const registration = document.getElementById('studentRegistration').value;
  const grade = document.getElementById('studentGrade').value;

  try {
    await fetch(BACK4APP_STUDENT_API_URL, {
      method: 'POST',
      headers: BACK4APP_HEADERS,
      body: JSON.stringify({
        name: name,
        registration: Number(registration),  // Converte para número
        grade: Number(grade)
      }),
    });
    
    studentForm.reset();
    loadStudents();  // Carrega a lista atualizada
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
  }
});

  loadStudents();
});