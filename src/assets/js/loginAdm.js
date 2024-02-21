document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const responseDiv = document.getElementById('response');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    axios.post('http://localhost:8080/api/login', { email, password})
      .then((response) => {
        if (response.data.success) {
          // Login bem-sucedido
          responseDiv.innerHTML = `<p>Seja Bem-vindo ${response.data.email}</p>`;
        } else {
          // Exibir mensagem de erro
          responseDiv.innerHTML = `<p>${response.data.message}</p>`;
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        responseDiv.innerHTML = `<p>Erro ao fazer login</p>`;
      });
  });
});
