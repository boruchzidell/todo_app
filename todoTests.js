#! /usr/bin/env node

var $ol = document.querySelector('ol');

function outputResult(message) {
  var $li = document.createElement('li');
  $li.innerText = message;
  $ol.appendChild($li);
  return $li;
}

function test(message, assertion) {
  var $msg = outputResult(message),
    passed = false;

  try {
    passed = assertion();
  } catch (e) {
    passed = false;
  }
  $msg.setAttribute('class', passed ? 'pass' : 'fail');
}

// ============ tests for ID generator ========================
test('ID generator increments the ID', function () {
  let currentId = getNextId();
  let nextId = getNextId();

  return nextId === currentId + 1;
});

//============ tests for todo objects ========================
test('Todo constructor is defined', function () {
  return typeof Todo === 'function';
});

test('todo is instance of Todo constructor', function () {
  let todo = new Todo('test', 1, 2021, 'test desc');

  return todo instanceof Todo;
});

test('todo has id property', function () {
  let todo = new Todo('test');

  return typeof todo.id === 'number';
});

test('todo object contains all required properties', function () {
  let todo = new Todo('test', 1, 2021, 'test desc', true);

  return todo.title && todo.month && todo.year && todo.description && todo.completed;
});

test('todo id cannot be changed', function () {
  todoList.clearList();
  todoList.seedList();

  let milkId = todoList.getTodoByProp({title: 'Buy Milk'})[0].id;

  todoList.update(milkId, {newProperty: `New property`, id: 2});

  return todoList.getTodoByProp({id: milkId}).length === 1;
});

test('properties cannot be added to todo object', function () {
  todoList.clearList();
  todoList.seedList();

  todoList.update('1', {newProperty: `New property`});

  return todoList.getTodoByProp({newProperty: `New property`}).length === 0;
});

test('todo completed property defaults to false', function () {
  let todo = new Todo('test', 1, 2021, 'test desc');

  return todo.completed === false;
});

test('todo has completed property that can be set to true', function () {
  let todo = new Todo('test', 1, 2021, 'test desc', true);

  return todo.completed === true;
});

test('title, month, year & desc properties are strings', function () {
  let todo = new Todo('test', 1, 2021, 'test desc');

  return (
    typeof todo.title === 'string' &&
    typeof todo.month === 'string' &&
    typeof todo.year === 'string' &&
    typeof todo.description === 'string'
  );
});

// ============ tests for isWithinMonthYear method ========================
test('todo instance is able to delegate isWithinMonthYear method', function () {
  let todo = new Todo('test', 1, 2021, 'test desc', true);

  return typeof todo.isWithinMonthYear === 'function';
});

test('todo instance does not own the isWithinMonthYear method', function () {
  let todo = new Todo('test', 1, 2021, 'test desc', true);

  return todo.hasOwnProperty('isWithinMonthYear') === false;
});

test('isWithinMonthYear returns with both arguments', function () {
  let todo = new Todo('test', 1, 2021, 'test desc');

  return todo.isWithinMonthYear(1, 2021) === true;
});

// ============  tests for todoList object  ================================
test('todoList is an object', function () {
  return typeof todoList === 'object';
});

test('todoList has add method', function () {
  return typeof todoList.add === 'function';
});

test('add method creates todo with all required properties', function () {
  let todo = todoList.add('test', 1, 2021, 'test desc', true);

  return todo.title && todo.month && todo.year && todo.description && todo.completed;
});

test('add method adds todo to collection', function () {
  todoList.clearList();

  let todo1 = todoList.add('test', 1, 2021, 'test desc');

  let todoId = todo1.id;

  return todoList.getTodoByProp({id: todoId}).length === 1;
});

test('todoList has delete method', function () {
  return typeof todoList.delete === 'function';
});

test('delete method deletes proper todo object', function () {
  let todo1 = todoList.add('test', 1, 2021, 'test desc');
  let todo2 = todoList.add('test2', 2, 2022, 'test 2');

  let todoId = todo1.id;

  todoList.delete(todoId);

  return todoList.getTodoByProp({id: todoId}).length === 0;
});

test('todoList has update method', function () {
  return typeof todoList.update === 'function';
});

test('update method operates on proper todo', function () {
  let todo1 = todoList.add('test', 1, 2021, 'test desc');
  let todo2 = todoList.add('test2', 2, 2022, 'test 2');
  let todoId = todo1.id;

  todoList.update(todoId, {title: 'updated title'});

  return (todoList.getTodoByProp({id: todoId})[0].title = 'updated title');
});

test('todoList has getTodoByProp method', function () {
  return typeof todoList.getTodoByProp === 'function';
});

test('getTodoByProp method retrieves only proper todos', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc');
  todoList.add('test', 2, 2022, 'test 2');
  todoList.add('test3', 2, 2022, 'test 2');

  return todoList.getTodoByProp({title: 'test'}).length === 2;
});

test('todoList has getTodosByDate method', function () {
  return typeof todoList.getTodosByDate === 'function';
});

test('getTodosByDate retrieves only the proper todos', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc');
  todoList.add('test2', 1, 2021, 'test 2');
  todoList.add('test3', 2, 2021, 'test 2');
  todoList.add('test3', 1, 2022, 'test 2');

  return todoList.getTodosByDate(1, 2021).length === 2;
});

test('todoList has getEntireList method', function () {
  return typeof todoList.getEntireList === 'function';
});

test('getEntireList returns all todos', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc');
  todoList.add('test2', 2, 2022, 'test 2');

  return todoList.getEntireList().length === 2;
});

test('clearList deletes all todo items', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc');
  todoList.add('test2', 2, 2022, 'test 2');

  todoList.clearList();

  return todoList.getEntireList().length === 0;
});

test('todoList has seedList method', function () {
  return typeof todoList.seedList === 'function';
});

test('seedList populates the todosArray', function () {
  todoList.seedList();

  let todo = todoList.getTodoByProp({title: 'Buy Milk'})[0];

  return todo.title === 'Buy Milk';
});

// ============ tests for todoManager ========================
test('todoManager is an object', function () {
  return typeof todoManager === 'object';
});

test('todoManager has getAllTodos method', function () {
  return typeof todoManager.getAllTodos === 'function';
});

test('todoManager method getAllTodos returns array of all todos', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc');
  todoList.add('test2', 2, 2022, 'test 2');

  return todoManager.getAllTodos().length === 2;
});

test('todoManager produces copies of the todo objects', function () {
  todoList.clearList();
  todoList.seedList();

  todoManager.getAllTodos()[0].id = "I'm not a number.";

  return todoList.getTodoByProp({id: "I'm not a number."}).length === 0;
});

test('todoManager has getCompleted method', function () {
  return typeof todoManager.getCompleted === 'function';
});

test('getCompleted method returns only completed todos', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc', true);
  todoList.add('test2', 2, 2022, 'test 2', false);
  todoList.add('test3', 3, 2023, 'test 3', true);

  return todoManager.getCompleted().length === 2;
});

test('todoManager has getByMonthYear method', function () {
  return typeof todoManager.getByMonthYear === 'function';
});

test('getByMonthYear retrieves only the proper todos', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc');
  todoList.add('test2', 1, 2021, 'test 2');
  todoList.add('test3', 2, 2021, 'test 2');

  return todoManager.getByMonthYear(1, 2021).length === 2;
});

test('todoManager has getByMonthYearCompleted method', function () {
  return typeof todoManager.getByMonthYearCompleted === 'function';
});

test('getByMonthYearCompleted method returns only completed todos within that period', function () {
  todoList.clearList();

  todoList.add('test', 1, 2021, 'test desc', true);
  todoList.add('test2', 1, 2021, 'test 2', false);
  todoList.add('test3', 3, 2023, 'test 3', true);

  return todoManager.getByMonthYearCompleted(1, 2021).length === 1;
});
