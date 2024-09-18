
const BACK4APP_TEACHER_API_URL = 'https://parseapi.back4app.com/classes/Professor';
const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'MzNwrAESFKCmnIKByGsd2Q7b2ZcIqD2yq6PR2bBV', 
  'X-Parse-REST-API-Key': '10YhxYRKR67BQzFd05sDYMqovXwCfQjnngUzOYzu', 
  'Content-Type': 'application/json'
};


document.addEventListener('DOMContentLoaded', () => {
  const teacherList = document.getElementById('teacherList');
  const teacherForm = document.getElementById('teacherForm');

  // Função para carregar professor
  const loadTeachers = async () => {
    try {
      const response = await fetch(BACK4APP_TEACHER_API_URL, {
        headers: BACK4APP_HEADERS,
      });
      const data = await response.json();
      const teachers = data.results; // O Back4App retorna os dados em "results"
      teacherList.innerHTML = '';
      teachers.forEach(teacher => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${teacher.name}, ${teacher.degree} em ${teacher.knowledgeArea}
          <button onclick="deleteTecher('${teacher.objectId}')">Remover</button>
        `;
        teacherList.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar os professores:', error);
    }
  };

  // Função para deletar professor
  window.deleteTecher = async (id) => {
    try {
      await fetch(`${BACK4APP_TEACHER_API_URL}/${id}`, {
        method: 'DELETE',
        headers: BACK4APP_HEADERS,
      });
      loadTeachers();
    } catch (error) {
      console.error('Erro ao deletar professor:', error);
    }
  };

  //Função cadastrar professor
  document.getElementById('teacherForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('teacherName').value;
  const degree = document.getElementById('teacherDegree').value;
  const knowledgeArea = document.getElementById('teacherKnowledgeArea').value;

  try {
    await fetch(BACK4APP_TEACHER_API_URL, {
      method: 'POST',
      headers: BACK4APP_HEADERS,
      body: JSON.stringify({ name, degree, knowledgeArea }),
    });

    document.getElementById('teacherForm').reset();
    loadTeachers();  // Carrega a lista atualizada
  } catch (error) {
    console.error('Erro ao cadastrar professor:', error);
  }
});

  loadTeachers();
});