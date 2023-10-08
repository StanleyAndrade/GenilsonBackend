document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const createProductForm = document.getElementById('create-product-form');
    const nomeInput = document.getElementById('nome');
    const descricaoInput = document.getElementById('descricao');
    const precoInput = document.getElementById('preco');
    
    // Função para listar os produtos.
    const listProducts = () => {
      axios.get('http://localhost:8080/api/produtos')
        .then((response) => {
          productList.innerHTML = '';
  
          response.data.forEach((product) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.nome} - ${product.descricao} - R$ ${product.preco.toFixed(2)}`;
  
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Apagar';
            deleteButton.addEventListener('click', () => deleteProduct(product._id));
  
            listItem.appendChild(deleteButton);
            productList.appendChild(listItem);

            const editButton = createEditButton(product._id); // Adicione o botão "Editar" ao lado de cada produto.
            listItem.appendChild(editButton);

            // const updateButton = document.createElement('button');
            // updateButton.textContent = 'Atualizar com Put';
            // updateButton.addEventListener('click', () => updateProduct(product._id));
  
            // listItem.appendChild(updateButton);
          });
        })
        .catch((error) => {
          console.error('Erro ao buscar produtos:', error);
        });
    };
  
    // Função para criar um novo produto.
    const createProduct = () => {
      const nome = nomeInput.value;
      const descricao = descricaoInput.value;
      const preco = parseFloat(precoInput.value);
  
      axios.post('http://localhost:8080/api/produtos', { nome, descricao, preco })
        .then(() => {
          nomeInput.value = '';
          descricaoInput.value = '';
          precoInput.value = '';
          listProducts();
        })
        .catch((error) => {
          console.error('Erro ao criar produto:', error);
        });
    };
  
    // Função para apagar um produto.
    const deleteProduct = (productId) => {
      axios.delete(`http://localhost:8080/api/produtos/${productId}`)
        .then(() => {
          listProducts();
        })
        .catch((error) => {
          console.error('Erro ao apagar produto:', error);
        });
    };
  
    // Evento para listar produtos quando a página é carregada.
    listProducts();
  
    // Evento para criar um novo produto quando o formulário é enviado.
    createProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createProduct();
    });

    // Função para criar um botão "Editar" para um produto.
    const createEditButton = (productId) => {
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => openEditForm(productId));
    return editButton;
    };

    // Função para abrir o formulário de edição de um produto.
    const openEditForm = (productId, nome, descricao, preco) => {
        // Preencha o campo de input do nome com o nome do produto.
        document.getElementById('edit-product-id').value = productId;
        document.getElementById('edit-nome').value = nome;
        document.getElementById('edit-descricao').value = descricao;
        document.getElementById('edit-preco').value = preco;
    
        // Exiba o formulário de edição.
        document.getElementById('edit-product-form').style.display = 'block';

        // Adicione o evento de clique ao botão "Salvar" após exibir o formulário.
    const saveButton = document.getElementById('edit-save-button');
    saveButton.addEventListener('click', () => {
        const updatedProductId = document.getElementById('edit-product-id').value;
        const updatedNome = document.getElementById('edit-nome').value;
        const updatedDescricao = document.getElementById('edit-descricao').value;
        const updatedPreco = parseFloat(document.getElementById('edit-preco').value);

        updateProduct(updatedProductId, updatedNome, updatedDescricao, updatedPreco);
    });
    };
  
    // ...

// Evento para abrir o formulário de edição quando o botão "Editar" é clicado.
productList.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === 'BUTTON' && e.target.textContent === 'Editar') {
      const listItem = e.target.parentElement;
      const productId = listItem.getAttribute('data-product-id');
      const productInfo = listItem.textContent.split(' - ');
  
      // Os valores estão separados por ' - ', então dividimos a string para obter as partes.
      const nome = productInfo[0];
      const descricao = productInfo[1];
      const precoText = productInfo[2];
      const preco = parseFloat(precoText.replace('R$ ', ''));
  
      // Chame openEditForm para preencher os campos do formulário de edição.
      openEditForm(productId, nome, descricao, preco);
    }
  });
  
  
  // Função para atualizar um produto por ID.
const updateProduct = (productId, nome, descricao, preco) => {
    axios.patch(`http://localhost:8080/api/produtos/${productId}`, { nome, descricao, preco })
      .then(() => {
        listProducts(); // Atualize a lista após a atualização.
        closeEditForm();
      })
      .catch((error) => {
        console.error('Erro ao atualizar produto:', error);
      });
  };
  
  // Evento para atualizar o produto quando o formulário de edição é enviado.
  const editForm = document.getElementById('edit-form');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = document.getElementById('edit-product-id').value;
    const nome = document.getElementById('edit-nome').value;
    const descricao = document.getElementById('edit-descricao').value;
    const preco = parseFloat(document.getElementById('edit-preco').value);
  
    updateProduct(productId, nome, descricao, preco);
  });
  
  // Função para fechar o formulário de edição.
  const closeEditForm = () => {
    document.getElementById('edit-product-form').style.display = 'none';
  };
  
  });
  