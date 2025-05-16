//Functions
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
/**
 * 
 * @param {True Display modal // False Unset modal} boolean 
 * @param {Element HTML for remove or add the class hidden} element 
 * @returns void
 */
const DisplayModal = (boolean, element) => boolean ? element.classList.remove("hidden") : element.classList.add("hidden");

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

