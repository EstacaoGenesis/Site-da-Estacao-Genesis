const carousel = document.querySelector('.carousel');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 1;
let isTransitioning = false;

const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, items[0]);

const updatedItems = Array.from(document.querySelectorAll('.carousel-item'));

function createDots() {
  for (let i = 0; i < items.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToItem(i + 1)); // Associar o clique aos itens (lembrando que o índice real começa em 1)
    dotsContainer.appendChild(dot);
  }
}

createDots();

const dots = document.querySelectorAll('.dot');

function moveCarousel() {
  const itemWidth = updatedItems[0].offsetWidth;
  const offset = (carousel.clientWidth - itemWidth) / 2;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${currentIndex * itemWidth - offset}px)`;

  updatedItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === (currentIndex - 1) % items.length); // Ignora os clones
  });
}

function goToItem(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex = index;
  moveCarousel();
}

function handleTransitionEnd() {
  if (updatedItems[currentIndex] === firstClone) {
    carousel.style.transition = 'none';
    currentIndex = 1;
    moveCarousel();
  }

  if (updatedItems[currentIndex] === lastClone) {
    carousel.style.transition = 'none';
    currentIndex = items.length;
    moveCarousel();
  }

  isTransitioning = false;
}

nextBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  moveCarousel();
});

prevBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  moveCarousel();
});

carousel.addEventListener('transitionend', handleTransitionEnd);
moveCarousel();
