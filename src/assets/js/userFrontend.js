document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const createProductForm = document.getElementById('create-product-form');
    const nameInput = document.getElementById('name');
    const nascimentoInput = document.getElementById('nascimento');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  
    // Função para listar os produtos.
    const listProducts = () => {
      axios.get('http://localhost:8080/api/user')
        .then((response) => {
          productList.innerHTML = '';
  
          response.data.forEach((user) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} - ${user.nascimento} - ${user.phone} - ${user.email} - ${user.password} - `;
            listItem.setAttribute('data-product-id', user._id);
  
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Apagar';
            deleteButton.addEventListener('click', () => deleteProduct(user._id));
  
            const editButton = createEditButton(user._id); // Adicione o botão "Editar" ao lado de cada produto.
  
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
  
            productList.appendChild(listItem);
          });
        })
        .catch((error) => {
          console.error('Erro ao buscar usuários:', error);
        });
    };
  
    // Função para criar um botão "Editar" para um produto.
    const createEditButton = (productId) => {
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => openEditForm(productId));
      return editButton;
    };
  
    // Função para abrir o formulário de edição e preencher os campos com os valores do produto.
    const openEditForm = (productId) => {
      const editProductForm = document.getElementById('edit-product-form');
  
      // Preencha os campos do formulário com os valores do produto selecionado.
      const listItem = document.querySelector(`[data-product-id="${productId}"]`);
      const productInfo = listItem.textContent.split(' - ');

      const name = productInfo[0];
      const nascimento = productInfo[1];
      const phone = productInfo[2];
      const email = productInfo[3];
      const password = productInfo[4];

      document.getElementById('edit-product-id').value = productId;
      document.getElementById('edit-name').value = name;
      document.getElementById('edit-nascimento').value = nascimento;
      document.getElementById('edit-phone').value = phone;
      document.getElementById('edit-email').value = email;
      document.getElementById('edit-password').value = password;
  
      // Exiba o formulário de edição.
      editProductForm.style.display = 'block';
    };
  
    // Função para atualizar um produto por ID usando uma solicitação PATCH.
    const updateProduct = (productId, updates) => {
      axios.patch(`http://localhost:8080/api/user/${productId}`, updates)
        .then((response) => {
          if (response.status === 200) {
            // Atualize a lista de produtos após a edição.
            listProducts();
            // Feche o formulário de edição.
            closeEditForm();
            //Exibe Console.log
            console.log('Usuário atualizado com sucesso');
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar usuário:', error);
        });
    };
  
    // Função para fechar o formulário de edição.
    const closeEditForm = () => {
      const editProductForm = document.getElementById('edit-product-form');
      editProductForm.style.display = 'none';
    };
  
    // Evento para listar produtos quando a página é carregada.
    listProducts();
  
    // Evento para criar um novo produto quando o formulário é enviado.
    createProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createProduct();
    });
  
    // Evento para atualizar o produto quando o formulário de edição é enviado.
    const editForm = document.getElementById('edit-form');
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const productId = document.getElementById('edit-product-id').value;
      const updatedName = document.getElementById('edit-name').value;
      const updatedNascimento = document.getElementById('edit-nascimento').value;
      const updatedPhone = document.getElementById('edit-phone').value;
      const updatedEmail = document.getElementById('edit-email').value;
      const updatedPassword = document.getElementById('edit-password').value;

    //   const updatedDescricao = document.getElementById('edit-descricao').value;
    //   const updatedPreco = parseFloat(document.getElementById('edit-preco').value);


  
      const updates = {

        name: updatedName,
        nascimento: updatedNascimento,
        phone: updatedPhone,
        email: updatedEmail,
        password: updatedPassword,

      };
  
      updateProduct(productId, updates);
    });
  
    // Função para criar um novo produto.
    const createProduct = () => {
      
      const name = nameInput.value;
      const nascimento = nascimentoInput.value;
      const phone = phoneInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
  
      axios.post('http://localhost:8080/api/user', { name, phone, email, nascimento, password })
        .then(() => {
          nameInput.value = '';
          nascimentoInput.value = '';
          phoneInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';
          
          listProducts();
          console.log('Usuário criado com sucesso:');
        })
        .catch((error) => {
          console.error('Erro ao criar usuario:', error);
        });
    };
  
    // Função para deletar um produto.
    const deleteProduct = (productId) => {
      axios.delete(`http://localhost:8080/api/user/${productId}`)
        .then(() => {
          listProducts();
          console.log('Usuário apagado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao apagar Usuário:', error);
        });
    };
  });
  