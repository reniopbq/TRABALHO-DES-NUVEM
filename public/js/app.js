// Credenciais do Back4App
const BACK4APP_API_URL = 'https://parseapi.back4app.com/classes/Course';
const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'MzNwrAESFKCmnIKByGsd2Q7b2ZcIqD2yq6PR2bBV',
  'X-Parse-REST-API-Key': '10YhxYRKR67BQzFd05sDYMqovXwCfQjnngUzOYzu',
  'Content-Type': 'application/json'
};

document.addEventListener('DOMContentLoaded', () => {
  const courseList = document.getElementById('courseList');
  const courseForm = document.getElementById('courseForm');

  // Função para carregar cursos
  const loadCourses = async () => {
    try {
      const response = await fetch(BACK4APP_API_URL, {
        headers: BACK4APP_HEADERS,
      });
      const data = await response.json();
      const courses = data.results; // O Back4App retorna os dados em "results"
      courseList.innerHTML = '';
      courses.forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `
          Curso: ${course.name} (${course.duration} horas) - Coordendor: ${course.coordinator}
          <button onclick="deleteCourse('${course.objectId}')">Remover</button>
        `;
        courseList.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  };

  // Função para cadastrar curso
  courseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('courseName').value;
    const duration = document.getElementById('courseDuration').value;
    const coordinator = document.getElementById('courseCoordinator').value;

    try {
      await fetch(BACK4APP_API_URL, {
        method: 'POST',
        headers: BACK4APP_HEADERS,
        body: JSON.stringify({
          name: name,
          duration: Number(duration),  // Converte para número
          coordinator: coordinator
        }),
      });

      courseForm.reset();
      loadCourses();
    } catch (error) {
      console.error('Erro ao cadastrar curso:', error);
    }
  });

  // Função para deletar curso
  window.deleteCourse = async (id) => {
    try {
      await fetch(`${BACK4APP_API_URL}/${id}`, {
        method: 'DELETE',
        headers: BACK4APP_HEADERS,
      });
      loadCourses();
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
    }
  };

  loadCourses();
});