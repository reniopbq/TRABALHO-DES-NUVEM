
const BACK4APP_CLASS_API_URL = 'https://parseapi.back4app.com/classes/Turma';
const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'MzNwrAESFKCmnIKByGsd2Q7b2ZcIqD2yq6PR2bBV', 
  'X-Parse-REST-API-Key': '10YhxYRKR67BQzFd05sDYMqovXwCfQjnngUzOYzu', 
  'Content-Type': 'application/json'
};


document.addEventListener('DOMContentLoaded', () => {
  const classList = document.getElementById('classList');
  const classForm = document.getElementById('classForm');

  // Função para carregar aluno
  const loadClasses = async () => {
    try {
      const response = await fetch(BACK4APP_CLASS_API_URL, {
        headers: BACK4APP_HEADERS,
      });
      const data = await response.json();
      const turmas = data.results; // O Back4App retorna os dados em "results"
      classList.innerHTML = '';
      turmas.forEach(turma => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${turma.course} (Ano: ${turma.year}) - Quantidade de alunos = ${turma.students}
          <button onclick="deleteClass('${turma.objectId}')">Remover</button>
        `;
        classList.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar as turmas:', error);
    }
  };

  // Função para deletar turma
  window.deleteClass = async (id) => {
    try {
      await fetch(`${BACK4APP_CLASS_API_URL}/${id}`, {
        method: 'DELETE',
        headers: BACK4APP_HEADERS,
      });
      loadClasses();
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
    }
  };

  //Função cadastrar turma
  classForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const year = document.getElementById('classYear').value;
  const course = document.getElementById('classCourse').value;
  const students = document.getElementById('classStudents').value;

  try {
    await fetch(BACK4APP_CLASS_API_URL, {
      method: 'POST',
      headers: BACK4APP_HEADERS,
      body: JSON.stringify({
        year: Number(year),
        course: course, 
        students: Number(students)
      }),
    });
    
    classForm.reset();
    loadClasses();  // Carrega a lista atualizada
  } catch (error) {
    console.error('Erro ao cadastrar turma:', error);
  }
});

  loadClasses();
});