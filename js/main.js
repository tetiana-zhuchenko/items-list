const addItemform = document.querySelector('.input-items-form');
const newItemInput = document.querySelector('.new-item-input');
const newItemSubmit = document.querySelector('.new-item-submit');
const deleteBtn = document.querySelectorAll('.delete-btn');
const itemsUlList = document.querySelector('.items-list ul');
const itemsList = document.querySelector('.items-list');

const items = [];

// add items
addItemform.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemValue = newItemInput.value;

  if (!itemValue) {
    alert('Please add the item');
    return;
  }

  const itemElement = document.createElement('li');
  itemElement.classList.add('item');
  itemElement.innerHTML = `<p class="item-content">${itemValue}</p>
  <button class="delete-btn pink-gradient">Delete</button>`;
  itemsUlList.appendChild(itemElement);

  newItemInput.value = '';
});

// delete items
itemsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});
