// --- 1. CONFIGURACIÓN DE DATOS ---
// Aquí puedes cambiar los nombres de las imágenes y los colores de los swatches.
const imageData = {
  'Negro': {
    swatchColor: '#1d1a16',
    front: 'imgs/model-negro.jpg',
    interior: 'imgs/negro1.jpg',
    model: 'imgs/negro3.jpg',
    detail: 'imgs/negro5.jpg'
  },
  'Brown': {
    swatchColor: '#5c4033', // A brown color for the swatch button
    front: 'imgs/brown.webp', 
    interior: 'imgs/brown1.jpg',
    model: 'imgs/brown2.1.jpg',
    detail: 'imgs/brown5.jpg'
  },
  'Ruby': {
    swatchColor: '#5e2a2a',
    front: 'imgs/model-ruby.jpg',
    interior: 'imgs/ruby3.jpg',
    model: 'imgs/ruby2.jpg',
    detail: 'imgs/ruby1.jpg'
  }
};

// Imágenes generales de la página (Artesanía y Mujer Chiara)
const globalImages = {
  artesania: 'imgs/leather.jpg',
  mujer: 'imgs/model-khaki.jpg'
};

// --- 2. SELECTORES DOM ---
const mainImage = document.getElementById('main-image');
const thumbnailContainer = document.getElementById('thumbnail-container');
const swatchContainer = document.getElementById('swatch-container');
const colorNameEl = document.getElementById('color-name');
const cartImg = document.getElementById('cart-item-img');

// --- 3. INICIALIZACIÓN DINÁMICA ---
// Esto construye los botones de color y las miniaturas al cargar la página
function initGallery() {
  // Cargar imágenes globales
  document.getElementById('img-artesania').src = globalImages.artesania;
  document.getElementById('img-mujer').src = globalImages.mujer;

  // Generar Swatches (Botones de color)
  Object.keys(imageData).forEach((color, index) => {
    const btn = document.createElement('button');
    btn.className = `swatch ${index === 0 ? 'active' : ''}`;
    btn.dataset.color = color;
    btn.style.setProperty('--c', imageData[color].swatchColor);
    btn.setAttribute('aria-label', color);
    
    // Evento de clic en el color
    btn.addEventListener('click', () => setColor(color));
    
    swatchContainer.appendChild(btn);
  });

  // Generar Miniaturas iniciales (basadas en el primer color: Negro)
  setColor('Negro');
}

// --- 4. LÓGICA DE CAMBIO DE COLOR ---
function setColor(color) {
  // 1. Actualizar nombre del color
  colorNameEl.textContent = color;
  
  // 2. Actualizar botones activos
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  document.querySelector(`.swatch[data-color="${color}"]`).classList.add('active');

  // 3. Actualizar imagen principal
  mainImage.src = imageData[color].front;
  cartImg.src = imageData[color].front; // Imagen del carrito

  // 4. Limpiar y regenerar miniaturas
  thumbnailContainer.innerHTML = '';
  const views = ['front', 'interior', 'model', 'detail'];
  
  views.forEach((view, index) => {
    const img = document.createElement('img');
    img.src = imageData[color][view];
    img.className = `thumb ${index === 0 ? 'active' : ''}`;
    img.dataset.view = view;
    img.alt = `Vista ${view} ${color}`;
    
    // Evento de clic en la miniatura
    img.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      img.classList.add('active');
      mainImage.src = img.src;
    });

    thumbnailContainer.appendChild(img);
  });
}

// --- 5. LÓGICA DEL CARRITO ---
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const continueShopping = document.getElementById('continue-shopping');
const addBtn = document.getElementById('add-to-cart');
const cartCountEl = document.getElementById('cart-count');
let cartCount = 0;

function toggleCart(open) {
  if (open) {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  } else {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }
}

cartToggle?.addEventListener('click', () => toggleCart(true));
closeCart?.addEventListener('click', () => toggleCart(false));
cartOverlay?.addEventListener('click', () => toggleCart(false));
continueShopping?.addEventListener('click', () => toggleCart(false));

addBtn?.addEventListener('click', () => {
  cartCount++;
  cartCountEl.textContent = cartCount;
  
  const selectedColor = colorNameEl.textContent;
  document.getElementById('cart-color').textContent = selectedColor;

  const original = addBtn.textContent;
  addBtn.textContent = 'Añadido ✓';
  addBtn.disabled = true;
  
  setTimeout(() => {
    toggleCart(true);
    addBtn.textContent = original;
    addBtn.disabled = false;
  }, 400);
});

// --- 6. SMOOTH SCROLL Y AÑO DINÁMICO ---
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Iniciar la galería al cargar la página
document.addEventListener('DOMContentLoaded', initGallery);