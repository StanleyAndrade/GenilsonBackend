// Array para armazenar itens no carrinho
const cart = [];

// Função para atualizar a exibição do carrinho
function updateCart() {
  const cartElement = document.getElementById('cart');
  const totalElement = document.getElementById('total');
  cartElement.innerHTML = '';

  let total = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    cartElement.appendChild(itemElement);
    total += item.price;
  });

  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para adicionar um item ao carrinho
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// Função para finalizar o pedido
function checkout() {
  // Aqui, você pode adicionar a lógica para enviar o pedido (por exemplo, via WhatsApp)
  // Esvazia o carrinho após o pedido ser finalizado
  cart.length = 0;
  updateCart();
  alert('Pedido finalizado! Obrigado por escolher a nossa pizzaria.');
}

// Evento para adicionar um produto ao carrinho quando o botão "Adicionar ao Carrinho" é clicado
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const productElement = event.target.parentElement;
    const productName = productElement.querySelector('h3').textContent;
    const productPrice = parseFloat(productElement.querySelector('.price').textContent.slice(3));
    addToCart(productName, productPrice);
  }
});

// Evento para finalizar o pedido quando o botão "Finalizar Pedido" é clicado
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', checkout);
