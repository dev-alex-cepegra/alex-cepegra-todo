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
const DisplayModal = (boolean) => {
  const hidden = document.querySelector('#modal');
  boolean ? hidden.classList.remove("hidden") : hidden.classList.add("hidden");
}
// NEW TODO
/**
 * Get new task form
 */
const newTodo = () => {
  const formTodo = document.querySelector('#new-todo');
  const title = formTodo.querySelector('#todo-input');
  const user = formTodo.querySelector('#name-input');
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
  if (!radio) {
    alert('Veuillez sélectionner une tâche à supprimer')
  } else {
    const tr = radio.closest('[data-task_id]');
    const id = tr.dataset.task_id;
    const index = todos.findIndex(t => t.id == id);
    todos.splice(index, 1);
  }


  // Remove the row from the table
}

// Change background row

const ChangeBackground = (target) => {
  const opacity = table.querySelector('.selected');
  if (opacity) opacity.classList.remove('selected');
  const tr = target.closest('[data-task_id]');
  tr.classList.add('selected')
}

const ModalUpdate = (formTodo, id) => {
  let titre = formTodo.querySelector('#todo-input');
  let user = formTodo.querySelector('#name-input');
  if (formTodo) {
    const task = todos.filter(t => t.id == id)[0]
    titre.value = task.titre;
    user.value = task.user;
  }
}

/**
 * 
 * 
 * @param {} formTodo  HTML ELMENT for get input value
 * @param {} id  It's ID data
 * @returns  New array<object>
 */
const TodosUpdate = (formTodo, id) => {

  let titre = formTodo.querySelector('#todo-input');
  let user = formTodo.querySelector('#name-input');
  console.log(titre.value);
  const tasks = todos.map(t => {
    if (t.id == id) {
      if (t.titre !== titre) t.titre = titre.value;
      if (t.user !== user) t.user = user.value;
    }
    return t
  })
  titre.value = '';
  user.value = '';
  return tasks;

}

const SwitchBtnSend = (isModif) => {
  if (isModif) {
    const sendBtn = document.querySelector('#modif');
    sendBtn.id = 'send';
  } else {
    const sendBtn = document.querySelector('#send');
    sendBtn.id = 'modif';
  }

}

// List todo
let todos = [
  {
    id: 1,
    titre: "Vaiselle",
    state: "todo",
    user: "Alex",
  },
  {
    id: 2,
    titre: "Linge",
    state: "todo",
    user: "Maureen",
  },
];
// Init pages
DisplayTable(todos);

// Variables


//  Element HTML by ID
const controller = document.querySelector('#controller')
const table = document.querySelector('#todos');

// Listening document
document.addEventListener('click', e => {
  const target = e.target;
  const formTodo = document.querySelector('#new-todo');
  if (target.name !== 'todo-radio') e.preventDefault();
  if (target.id === 'new') DisplayModal(true);
  if (target.id === "send") {
    newTodo();
    DisplayTable(todos);
    DisplayModal(false)
  }
  if (target.id === 'delete') {

    DeleteTodo();
    table.querySelector('tbody').innerHTML = "";
    DisplayTable(todos)
  }
  if (target.checked) {
    ChangeBackground(target);
  }
  if (target.id === 'update') {

    const id = table.querySelector('input[name="todo-radio"]:checked')?.closest('[data-task_id]').dataset.task_id;
    if (!id) {
      alert('select a todo plz');

    } else {
      SwitchBtnSend(false);
      DisplayModal(true);
      ModalUpdate(formTodo, id);

    }

  }
  if (target.id === 'modif') {
    const id = table.querySelector('input[name="todo-radio"]:checked')?.closest('[data-task_id]').dataset.task_id;
    todos = [...TodosUpdate(formTodo, id)]
    SwitchBtnSend(true);
    table.querySelector('tbody').innerHTML = "";
    DisplayTable(todos);
    DisplayModal(false);
  }
})
