Vue.component("todolists", {
  template: `
    <div :class="bodyTheme">
      <div>
        <nav class="navbar navbar-expand navbar-lg fixed-top d-flex justify-content-between" :class="bgChange">
          <div class="navbar-nav">
            <label class="switch">
            <input type="checkbox" @click="toggleDark">
            <span class="slider"></span>
            </label>
            <h3>{{darkModeText}}</h3>
          </div>
          
          <div class="mr-2">
            <h3>
              <a :class="bgChange" href="https://github.com/charles3399/Simple-Vue-App" target="_blank" rel="noopener noreferrer" role="button"><i class="fab fa-github-square"></i></a>
            </h3>
          </div>

        </nav>
      </div>
      <br><br><br>
      <div class="container-fluid col-lg-6">
        <div class="card text-center shadow my-5" :class="bgChange">

          <div class="card-header">
            <h4>{{cardTitle}}</h4>
          </div>

          <div class="card-body">
            <input class="form-control" type='text' v-model="addTodo" v-on:keyup.enter="addList" v-on:keyup.space="spaceBarValidate">

            <button class="btn btn-success btn-lg my-2" @click='addList' :disabled="isDisabled">
              <i class="fa fa-plus-circle" aria-hidden="true"><strong> Add</strong></i>
            </button>
          </div>

        </div>

        <ul class="list-group">
          <li :class="bgChange" class="shadow mb-4 list-group-item" v-for="list, remove in lists">

            <span v-if="list.isDone"><s>{{list.text}}</s></span>
            <span v-else>{{list.text}}</span>

            <button class="close float-right" aria-label="Close" @click="removeList(remove)">
              <span aria-hidden="true">&times;</span>
            </button>

            <button v-if="list.isDone" class="btn btn-sm undoButton float-right" @click="toggleDone(list)">
              <i class="fas fa-undo" aria-hidden="true"><strong> Undo</strong></i> 
            </button>

            <button v-else class="btn btn-sm doneButton float-right" @click="toggleDone(list)">
              <i class="far fa-check-circle" aria-hidden="true"><strong> Mark as done</strong></i> 
            </button>

          </li>
        </ul>

      </div>

      <footer class="page-footer" :class="bgChange">
        <div class="footer-copyright text-center py-3">
          <span>&copy; {{getYear}} Copyright Todo App, made with <i class="far fa-heart"></i> by Charles</span>
        </div>
      </footer>

    </div>
  `,

  data() {
    return {
      addTodo: "",
      bgChange: "bg-white text-dark",
      bodyTheme: "",
      darkModeText: 'Good day!',
      cardTitle: 'List your todo for today!',
      darkMode: false,
      getYear: new Date().getFullYear(),
      lists: [
        { text: "Clean the room", isDone: false },
        { text: "Cook food", isDone: false },
        { text: "Sleep", isDone: true },
      ],
    };
  },

  methods: {
    addList() {
      inputLen = this.addTodo.trim().length;
      if (inputLen == 0) {
        alert('Cannot be empty, please enter a valid todo/task!')
      }
      else {
        this.lists.push({ text: this.addTodo, isDone: false })
      }
      this.addTodo = ""
    },
 
    spaceBarValidate() {
      inputLen = this.addTodo.trim().length;
      if(inputLen == 0) {
        alert('Your input is empty, make sure to add a valid todo/task!')
        this.addTodo = ""
      }
    },

    removeList(remove) {
      this.$delete(this.lists, remove)
    },

    toggleDone(list) {
      list.isDone = !list.isDone
    },

    toggleDark() {
      if (this.darkMode === true) {
        this.darkModeText = 'Good day!'
        this.cardTitle = 'List your todo for today!'
        this.bgChange = 'bg-white text-dark'
        this.bodyTheme = ''
        this.darkMode = false
      } else {
        this.darkModeText = 'Good night!'
        this.bgChange = 'bg-dark text-white'
        this.cardTitle = 'List your todo for tonight!'
        this.bodyTheme = 'dark'
        this.darkMode = true
      }
    },
  },

  computed: {
    isDisabled() {
      return this.addTodo.length === 0;
    },
  },
});

Vue.config.devtools = false //disable when debugging

new Vue({
  el: '#app'
});