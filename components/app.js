Vue.component("todolists", {
  template:/*html*/
  `
    <div :class="bodyTheme">
      <div>
        <nav class="navbar navbar-expand navbar-lg fixed-top d-flex justify-content-between" :class="bgChange">
          <div class="navbar-nav">
            <h3>
              <i :class="iconMode" @click="toggleDark" id="iconMode"></i>
            </h3>
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
            <h4>To-do list</h4>
          </div>

          <div class="card-body">
            <input class="form-control" type='text' v-model="addTodo" @keyup.enter="addList">

            <button class="btn btn-success btn-lg my-2" @click='addList' :disabled="isDisabled">
              <i class="fa fa-plus-circle" aria-hidden="true"><strong> Add</strong></i>
            </button>
          </div>

        </div>

        <ul class="list-group">
          <li :class="bgChange" class="shadow mb-4 list-group-item d-flex justify-content-between" v-for="list, remove in lists">
            <div>
              <span v-if="list.isDone"><s>{{list.text}}</s></span>
              <span v-else @click="list.edit = true" v-show="!list.edit">{{list.text}}</span>
              <input type='text' v-show="list.edit == true" v-model="list.text" @blur="list.edit = false; $emit('update')" @keyup.enter = "list.edit = false; $emit('update')">
              <i v-show="!list.isDone" class="fas fa-question-circle" id="tooltip">
                <div id="tooltiptext" :class="toolTip">Click the text to edit</div>
              </i>
            </div>
            <div>
              <button v-if="list.isDone" class="btn btn-sm float-right" id="undoButton" @click="toggleDone(list)">
                <i :class="textColor" class="fas fa-undo" aria-hidden="true"><span :class="textColor"> Undo</span></i> 
              </button>
              <button v-else class="btn btn-sm float-right" id="doneButton" @click="toggleDone(list)">
                <i :class="textColor" class="fas fa-check" aria-hidden="true"><span :class="textColor"> Mark as done</span></i> 
              </button>

              <button :class="deleteTodoButton" class="btn-close" aria-label="Close" @click="removeList(remove)"></button>
            </div>

          </li>
        </ul>

      </div>

      <footer class="footer text-muted">
        <div class="footer-copyright text-center py-3">
          <span :class="textColor">&copy; {{getYear}} Copyright Todo App, made with <i class="far fa-heart"></i> by Charles</span>
        </div>
      </footer>

    </div>
  `,

  data() {
    return {
      addTodo: "",
      bgChange: "bg-white text-dark",
      textColor: "text-dark",
      toolTip: 'bg-dark text-white',
      deleteTodoButton: '',
      bodyTheme: "",
      iconMode: 'fas fa-sun',
      darkMode: false,
      getYear: new Date().getFullYear(),
      lists: [
        { text: "Clean the room", isDone: false, edit: false },
        { text: "Cook food", isDone: false, edit: false  },
        { text: "Sleep", isDone: true , edit: false },
      ],
    };
  }, 
  mounted() {
    //gets the saved theme and data from localstorage
    if(localStorage.getItem('dark-mode')) {
      let theme = JSON.parse(localStorage.getItem('dark-mode'))

      if(theme) {
        this.iconMode = 'far fa-moon'
        this.bgChange = 'bg-dark text-white'
        this.textColor= "text-white"
        this.deleteTodoButton = 'btn-close-white'
        this.toolTip = 'bg-white text-dark'
        this.bodyTheme = 'dark'
      }
      else {
        this.iconMode = 'fas fa-sun'
        this.bgChange = 'bg-white text-dark'
        this.textColor= "text-dark"
        this.deleteTodoButton = ''
        this.toolTip = 'bg-dark text-white'
        this.bodyTheme = ''
      }
      this.darkMode = theme
    }

    if(localStorage.getItem('todos')) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      this.lists = todos
    }
  },
  watch : {
    // saves theme preference even when page is reloaded
    darkMode: {
      handler() {
        localStorage.setItem('dark-mode', JSON.stringify(this.darkMode))
      },
      deep: true
    },
    lists: {
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.lists))
      },
      deep: true
    }
  },
  methods: {
    // Validates input and adds/push a todo
    addList() {
      inputLen = this.addTodo.trim().length;
      if (inputLen == 0) {
        alert('Cannot be empty, please enter a valid todo/task!')
      }
      else {
        this.lists.unshift({ text: this.addTodo, isDone: false, edit:false })
      }
      this.addTodo = ""
    },

    //Deletes a todo
    removeList(remove) {
      this.$delete(this.lists, remove)
    },

    //If a todo is done, it will strike through the whole text
    toggleDone(list) { 
      list.isDone = !list.isDone
    },

    //Toggles dark mode and light mode
    toggleDark() {
      if (this.darkMode) {
        this.iconMode = 'fas fa-sun'
        this.bgChange = 'bg-white text-dark'
        this.textColor= "text-dark"
        this.deleteTodoButton = ''
        this.toolTip = 'bg-dark text-white'
        this.bodyTheme = ''
        this.darkMode = false
      } else {
        this.iconMode = 'far fa-moon'
        this.bgChange = 'bg-dark text-white'
        this.textColor= "text-white"
        this.deleteTodoButton = 'btn-close-white'
        this.toolTip = 'bg-white text-dark'
        this.bodyTheme = 'dark'
        this.darkMode = true
      }
    },
  },

  computed: {
    //Disables the add button if there is no character to prevent adding a todo with an empty text
    isDisabled() {
      return this.addTodo.length === 0;
    },
  },
});

Vue.config.devtools = false //set to true when debugging, false for production

new Vue({
  el: '#app'
});