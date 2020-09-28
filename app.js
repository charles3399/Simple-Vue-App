Vue.component("todolists", {
  template: `
    <div :class="bodyTheme">
      <div>
        <nav class="navbar navbar-expand navbar-lg fixed-top" :class="bgChange">
          <h4>{{darkModeText}}</h4>
          <label class="switch">
            <input type="checkbox" @click="toggleDark">
            <span class="slider"></span>
          </label>
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
    </div>
  `,

  data() {
    return {
      addTodo: "",
      bgChange: "bg-white text-dark",
      bodyTheme: "",
      darkModeText: 'Dark mode off',
      cardTitle: 'List your todo for today!',
      darkMode: false,
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
        this.lists.unshift({ text: this.addTodo, isDone: false })
      }
      this.addTodo = ""
    },
 
    spaceBarValidate() {
      inputLen = this.addTodo.trim().length;
      if(inputLen == 0) {
        alert('Your input is empty, make sure to add a valid todo/task!')
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
        this.darkModeText = 'Dark mode off'
        this.cardTitle = 'List your todo for today!'
        this.bgChange = 'bg-white text-dark'
        this.bodyTheme = ''
        this.darkMode = false
      } else {
        this.darkModeText = 'Dark mode on'
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