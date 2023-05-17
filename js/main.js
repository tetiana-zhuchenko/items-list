const itemContainer = document.querySelector('[data-items]');
const newItemsForm = document.querySelector('[data-new-item-form]');
const newItemInput = document.querySelector('[data-new-item-input]');
const serchInput = document.querySelector('[data-search]');
const searchInput = document.querySelector('[data-search-input]');
const LOCAL_STORAGE_ITEM_KEY = 'task.itemsList';
let itemsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)) || [];
console.log(itemsList);

// add item
newItemsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemName = newItemInput.value;
  if (itemName === null || itemName === '') {
    alert('Please add the item');
    return;
  }
  const item = createListItem(itemName);
  newItemInput.value = null;
  itemsList.push(item);
  saveAndRender();
});

function createListItem(name) {
  return { id: Date.now().toString(), name: name };
}

function saveAndRender() {
  save();
  render(itemsList);
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(itemsList));
}

function render(itemsList) {
  clearElement(itemContainer);

  itemsList.forEach((item) => {
    const itemElement = document.createElement('li');
    itemElement.classList.add('item');
    itemElement.innerHTML = `<p class="item-content">${item.name}</p>
  <button class="delete-btn pink-gradient" >Delete</button>`;
    itemContainer.appendChild(itemElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render(itemsList);

// delete item
itemContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
    itemsList = itemsList.filter(
      (item) => item.name !== e.target.previousElementSibling.innerHTML
    );
  }
  saveAndRender();
});

// search item
// listener for input
serchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value;
  console.log(searchValue);

  const tempItemsList = filteredListForSearch(searchValue);

  render(tempItemsList);
});

// listener for submit
serchInput.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchValue = searchInput.value;
  const tempItemsList = filteredListForSearch(searchValue);

  render(tempItemsList);
});

function filteredListForSearch(value) {
  return itemsList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
}

// previus version, without locallStorage

// const addItemform = document.querySelector('.input-items-form');
// const newItemInput = document.querySelector('.new-item-input');
// const newItemSubmit = document.querySelector('.new-item-submit');
// const deleteBtn = document.querySelectorAll('.delete-btn');
// const itemsUlList = document.querySelector('.items-list ul');
// const itemsList = document.querySelector('.items-list');

// // add items
// addItemform.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const itemValue = newItemInput.value;

//   if (itemValue === null || itemValue === '') {
//     alert('Please add the item');
//     return;
//   }

//   const itemElement = document.createElement('li');
//   itemElement.classList.add('item');
//   itemElement.innerHTML = `<p class="item-content">${itemValue}</p>
//   <button class="delete-btn pink-gradient">Delete</button>`;
//   itemsUlList.appendChild(itemElement);

//   newItemInput.value = '';
// });

// // delete items
// itemsList.addEventListener('click', (e) => {
//   if (e.target.classList.contains('delete-btn')) {
//     e.target.parentElement.remove();
//   }
// });
