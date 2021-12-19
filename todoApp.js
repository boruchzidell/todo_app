#! /usr/bin/env node

let getNextId = (function () {
  let id = 0;

  return function () {
    id += 1;
    return id;
  };
})();

class Todo {
  constructor(title, month, year, description, completed = false) {
    this.id = getNextId();
    Object.defineProperty(this, 'id', {
      writable: false,
    });

    this.title = title;
    this.completed = completed;
    this.month = String(month);
    this.year = String(year);
    this.description = description;

    Object.seal(this);
  }

  isWithinMonthYear(month, year) {
    return this.month === String(month) && this.year === String(year);
  }
}

let todoList = (function () {
  // collection
  let todosArray = [];

  // for seeding the collection
  let todoData1 = {
    title: 'Buy Milk',
    month: '1',
    year: '2017',
    description: 'Milk for baby',
  };

  let todoData2 = {
    title: 'Buy Apples',
    month: '',
    year: '2017',
    description: 'An apple a day keeps the doctor away',
  };

  let todoData3 = {
    title: 'Buy chocolate',
    month: '1',
    year: '',
    description: 'For the cheat day',
  };

  let todoData4 = {
    title: 'Buy Veggies',
    month: '',
    year: '',
    description: 'For the daily fiber needs',
  };

  let todoSet = [todoData1, todoData2, todoData3, todoData4];

  return {
    add(title, month, year, description, completed) {
      let todo = new Todo(title, month, year, description, completed);

      todosArray.push(todo);

      // return copy of newly created todo object
      return Object.assign({}, todo);
    },

    delete(id) {
      let todoIndex;

      for (let i = 0; i < todosArray.length; i += 1) {
        let currentTodo = todosArray[i];

        if (currentTodo.id === id) {
          todoIndex = i;
          break;
        }
      }

      todosArray.splice(todoIndex, 1);

      return this;
    },

    clearList() {
      todosArray.length = 0;

      return this;
    },

    update(id, props) {
      let todo = todosArray.find((todo) => (todo.id = id));

      for (let prop in props) {
        todo[prop] = props[prop];
      }

      return this;
    },

    getTodoByProp(props) {
      let retrieved = todosArray.filter((todo) => {
        return Object.keys(props).every((prop) => {
          return todo[prop] === props[prop];
        });
      });

      // return a copy
      return retrieved.map((todo) => Object.assign({}, todo));
    },

    // necessary because getTodoByProp doesn't work when
    // filtering using an instance method
    getTodosByDate(month, year) {
      let filtered = todosArray.filter((todo) => {
        return todo.isWithinMonthYear(String(month), String(year));
      });

      return filtered.slice();
    },

    getEntireList() {
      return todosArray.slice();
    },

    seedList() {
      todoSet.forEach((todo) => {
        this.add(todo.title, todo.month, todo.year, todo.description);
      });
    },
  };
})();

let todoManager = {
  getAllTodos() {
    return todoList.getEntireList().map((todo) => {
      return {...todo};
    });
  },
  getCompleted() {
    return todoList.getEntireList().filter((todo) => {
      return todo.completed === true;
    });
  },
  getByMonthYear(month, year) {
    return todoList.getTodosByDate(month, year);
  },
  getByMonthYearCompleted(month, year) {
    return todoList.getTodosByDate(month, year).filter((todo) => {
      return todo.completed === true;
    });
  },
};
