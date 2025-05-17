//Functions

// DISPLAY TABLE
/**
 *  * Display table
 * @param {} object It's an array of objects
 */
const DisplayTable = (object) => {

  object.forEach((o) => {
    const table = document.querySelector('#todos')

    const templateColTable = `
    <tr data-task_id="${o.id}">
      <td>${o.titre}</td>
      <td>
        <select name="state" id="todo-select">
          <option value="todo">Todo</option>
          <option value="wip">Wait In Progress</option>
          <option value="done">Done</option>
        </select>
      </td>
      <td>${o.user}</td>
      <td><input type="radio" name="todo-radio"  id="todo-radio" /></td>
    </tr>
  `

    table.querySelector("tbody").insertAdjacentHTML("beforeend", templateColTable)
  })
}

// DISPLAY MODAL
/**
 * 
 * @param {} boolean True Display modal // False Unset modal
 * @param {} element Element HTML for remove or add the class hidden
 * @returns void
 */
const DisplayModal = (boolean, element) => boolean ? element.classList.remove("hidden") : element.classList.add("hidden");

// NEW TODO
/**
 * Get new task form
 */
const newTodo = () => {
  const formTodo = document.querySelector('#new-todo');
  const title = formTodo.querySelector('#todo-input');
  const user = formTodo.querySelector('#name-input')
  const newTodos = {
    id: Date.now(),
    titre: title.value,
    state: 'todo',
    user: user.value
  }
  todos.push(newTodos)
  table.querySelector('tbody').innerHTML = "";
}

// DELETE TODO
/**
 * Delete todo
 * search the radio button checked
 * search the closest tr and get the data-task_id
 * 
 */
const DeleteTodo = () => {
    const radio = table.querySelector('input[name="todo-radio"]:checked');
    const tr = radio.closest('[data-task_id]');
    const id = tr.dataset.task_id;
    const index = todos.findIndex(t => t.id == id); 
    todos.splice(index, 1);
    // Remove the row from the table
}

// Change background row

const ChangeBackground = (target) => {
    const opacity = table.querySelector('.selected');
    if (opacity) opacity.classList.remove('selected');
    const tr = target.closest('[data-task_id]');
    tr.classList.add('selected')
}

// List todo
const todos = [
  {
    id: 1,
    titre: "titre todo",
    state: "todo",
    user: "Alex",
  },
  {
    id: 2,
    titre: "test",
    state: "todo",
    user: "Ma",
  },
];
// Init pages
DisplayTable(todos);

// Variables


//  Element HTML by ID
const controller = document.querySelector('#controller')
const hidden = document.querySelector('#modal');
const table = document.querySelector('#todos');

// Listening document
document.addEventListener('click', e => {
  const target = e.target;
  if (target.name !== 'todo-radio') e.preventDefault();
  if (target.id === 'new') DisplayModal(true, hidden);
  if (target.id === "send") {
    newTodo();
    DisplayTable(todos);
    DisplayModal(false, hidden)
  }
  if (target.id === 'delete') {
    const radio = table.querySelector('#todo-radio');
    const tr = radio.closest("[data-task_id]")
    const id = tr.dataset.task_id

    todos = todos.filter((t) => t.id != id);
    DisplayTable(todos)

  }
})

