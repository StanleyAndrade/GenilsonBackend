document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const createProductForm = document.getElementById('create-product-form');
  const nomeInput = document.getElementById('nome');
  const descricaoInput = document.getElementById('descricao');
  const tamanhosInput = document.getElementById('tamanhos')
  const saboresInput = document.getElementById('sabores')
  const precoInput = document.getElementById('preco');


  // Função para listar os produtos.
  const listProducts = () => {
    axios.get('http://localhost:8080/api/produtos')
      .then((response) => {
        productList.innerHTML = '';

        response.data.forEach((product) => {
          const listItem = document.createElement('li');

          listItem.innerHTML = `${product.nome} <br> ${product.descricao} <br> ${product.tamanhos} <br> ${product.sabores} <br> ${product.preco.toFixed(2)} <br>`

          listItem.setAttribute('data-product-id', product._id);

          const carrinhoButton = document.createElement('button')
          carrinhoButton.textContent = 'Colocar no Carrinho'
          listItem.appendChild(carrinhoButton)

          // const deleteButton = document.createElement('button');
          // deleteButton.textContent = 'Apagar';
          // deleteButton.addEventListener('click', () => deleteProduct(product._id));

          // const editButton = createEditButton(product._id); // Adicione o botão "Editar" ao lado de cada produto.

          // listItem.appendChild(deleteButton);
          // listItem.appendChild(editButton);

          productList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  // // Função para criar um botão "Editar" para um produto.
  // const createEditButton = (productId) => {
  //   const editButton = document.createElement('button');
  //   editButton.textContent = 'Editar';
  //   editButton.addEventListener('click', () => openEditForm(productId));
  //   return editButton;
  // };

  // // Função para abrir o formulário de edição e preencher os campos com os valores do produto.
  // const openEditForm = (productId, product) => {
  //   const editProductForm = document.getElementById('edit-product-form');

  //   // Preencha os campos do formulário com os valores do produto selecionado.
  //   const listItem = document.querySelector(`[data-product-id="${productId}"]`);
  //   const productInfo = listItem.innerHTML.split(' <br> ');

  //   const nome = productInfo[0];
  //   const descricao = productInfo[1];
  //   const tamanhos = productInfo[2];
  //   const sabores = productInfo[3];
  //   const precoText = productInfo[4];
  //   const preco = parseFloat(precoText.replace('R$ ', ''));

  //   document.getElementById('edit-product-id').value = productId;
  //   document.getElementById('edit-nome').value = nome;
  //   document.getElementById('edit-descricao').value = descricao;
  //   document.getElementById('edit-tamanhos').value = tamanhos;
  //   document.getElementById('edit-sabores').value = sabores;
  //   document.getElementById('edit-preco').value = preco;

  //   // Exiba o formulário de edição.
  //   editProductForm.style.display = 'block';
  // };

  // // Função para atualizar um produto por ID usando uma solicitação PATCH.
  // const updateProduct = (productId, updates) => {
  //   axios.patch(`http://localhost:8080/api/produtos/${productId}`, updates)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // Atualize a lista de produtos após a edição.
  //         listProducts();
  //         // Feche o formulário de edição.
  //         closeEditForm();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Erro ao atualizar produto:', error);
  //     });
  // };

  // // Função para fechar o formulário de edição.
  // const closeEditForm = () => {
  //   const editProductForm = document.getElementById('edit-product-form');
  //   editProductForm.style.display = 'none';
  // };

  // Evento para listar produtos quando a página é carregada.
  listProducts();

  // // Evento para criar um novo produto quando o formulário é enviado.
  // createProductForm.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   createProduct();
  // });

  // // Evento para atualizar o produto quando o formulário de edição é enviado.
  // const editForm = document.getElementById('edit-form');
  // editForm.addEventListener('submit', (e) => {
  //   e.preventDefault();

  //   const productId = document.getElementById('edit-product-id').value;
  //   const updatedNome = document.getElementById('edit-nome').value;
  //   const updatedDescricao = document.getElementById('edit-descricao').value;
  //   const updatedTamanhos = document.getElementById('edit-tamanhos').value;
  //   const updatedSabores = document.getElementById('edit-sabores').value;
  //   const updatedPreco = parseFloat(document.getElementById('edit-preco').value);

  //   const updates = {
  //     nome: updatedNome,
  //     descricao: updatedDescricao,
  //     tamanhos: updatedTamanhos,
  //     sabores: updatedSabores,
  //     preco: updatedPreco
  //   };

  //   updateProduct(productId, updates);
  // });

  // // Função para criar um novo produto.
  // const createProduct = () => {
  //   const nome = nomeInput.value;
  //   const descricao = descricaoInput.value;
  //   const tamanhos = tamanhosInput.value;
  //   const sabores = saboresInput.value;
  //   const preco = parseFloat(precoInput.value);

  //   axios.post('http://localhost:8080/api/produtos', { nome, descricao, tamanhos, sabores, preco })
  //     .then(() => {
  //       nomeInput.value = '';
  //       descricaoInput.value = '';
  //       tamanhosInput.value = '';
  //       saboresInput.value = '';
  //       precoInput.value = '';
  //       listProducts();
  //     })
  //     .catch((error) => {
  //       console.error('Erro ao criar produto:', error);
  //     });
  // };

  // // Função para deletar um produto.
  // const deleteProduct = (productId) => {
  //   axios.delete(`http://localhost:8080/api/produtos/${productId}`)
  //     .then(() => {
  //       listProducts();
  //     })
  //     .catch((error) => {
  //       console.error('Erro ao apagar produto:', error);
  //     });
  // };
});
