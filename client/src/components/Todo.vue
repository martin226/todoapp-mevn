<template>
  <section class="main">
    <p class="lead">Total Number of todos: {{ todoList.length }}</p>
    <div class="input-group mb-3 input-group-lg">
      <input
        class="form-control new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        type="text"
        v-model="newTask"
        @keyup.enter="addTask(newTask)"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addTask(newTask)">Add Task</button>
      </div>
    </div>

    <div class="todo-list" v-if="todoList.length > 0" v-cloak>
      <ul class="list-group">
        <li class="list-group-item" v-for="todo in filteredList" :key="todo._id">
          <input
            type="text"
            class="form-control"
            autofocus
            autocomplete="off"
            v-if="todo.edited"
            :value="todo.todo"
            @keyup.enter="editTask(todo._id, $event.target.value, todo.completed, false)"
            @keyup.esc="cancelEdit(todo._id, todo.completed)"
            v-focus
          />
          <input
            v-if="!todo.edited"
            type="checkbox"
            class="checkbox"
            @click="editTask(todo._id, todo.todo, !todo.completed, todo.edited)"
            :checked="todo.completed"
          />

          <label
            class="todo-item"
            v-if="!todo.edited"
            @dblclick="editTask(todo._id, todo.todo, todo.completed, true)"
            :class="{ 'completed': todo.completed }"
          >
            {{ todo.todo }}
            <p class="extra-info lead">Creation Date: {{ formatDate(todo.created) }}</p>
          </label>

          <button
            v-if="!todo.edited"
            type="button"
            class="close"
            aria-label="close"
            @click="deleteTask(todo._id)"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      </ul>

      <button @click="visibility='all'" class="btn btn-outline-primary filter">Show All</button>
      <button @click="visibility='active'" class="btn btn-outline-primary filter">Show Active</button>
      <button @click="visibility='completed'" class="btn btn-outline-primary filter">Show Completed</button>
      <p class="lead footer-text">double-click a todo item to edit | created by martin sit</p>
    </div>

    <p v-else class="lead">Looks like you don't have any todos yet! :(</p>
  </section>
</template>

<script>
import ApiClient from "../ApiClient";

const filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  }
};

export default {
  name: "Todo",
  data() {
    return {
      todoList: [],
      newTask: "",
      visibility: "all",
      beforeEditCache: ""
    };
  },
  computed: {
    filteredList: function() {
      return filters[this.visibility](this.todoList);
    }
  },
  methods: {
    // Retrieve tasks from API and save in the todoList array
    retrieveTasks: async function() {
      await ApiClient.retrieveTasks()
        .then(todos => {
          this.todoList = todos;
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Add task to todolist
    addTask: async function(task) {
      if (!/\S/.test(task)) return;
      let created = new Date();
      await ApiClient.addTask(task, created)
        .then(() => {
          this.newTask = ""; // Clear input field
          this.retrieveTasks(); // Reload the array
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Delete task from todolist
    deleteTask: async function(id) {
      await ApiClient.deleteTask(id)
        .then(() => {
          this.retrieveTasks(); // Reload the array
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Edit task in todolist
    editTask: async function(id, task, completed, editing) {
      this.beforeEditCache = task; // Save the task to edit cache
      if (task == "") return this.deleteTask(id); // Delete from todolist if the new task is empty
      await ApiClient.editTask(id, task, completed, editing)
        .then(() => {
          this.retrieveTasks(); // Reload the array
        })
        .catch(err => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Revert the task back to the state in the cache
    cancelEdit: async function(id, completed) {
      await ApiClient.editTask(id, this.beforeEditCache, completed, false)
        .then(() => {
          this.retrieveTasks(); // Reload the array
        })
        .catch(err => this.$toastr.e(`An error occurred: ${err}`));
    },
    formatDate: function(dateString) {
      let date = new Date(dateString);
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    }
  },
  // Retrieve tasks when the page is loaded
  async beforeMount() {
    await this.retrieveTasks();
  },
  // Custom directive to focus on input field when the DOM is updated
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};
</script>
