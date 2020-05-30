Vue.component('todolists', {
  template: `
    <div v-if="mode === false" class="app">
      <div>
        <nav class="navbar navbar-expand navbar-lg">
          <h2>Dark mode off</h2>
          <label class="switch">
            <input type="checkbox" @click="toggleDark">
            <span class="slider"></span>
          </label>
        </nav>
      </div>

      <div class="container-fluid col-lg-6">
        <div class="card text-center shadow my-5">
          <div class="card-header"><h4>List your to-do for today!</h4></div>
          <div class="card-body">
      
            <input class="form-control" type='text' v-model="addTodo" v-on:keyup.enter="addList">

            <button class="btn btn-success btn-lg my-2" @click='addList' :disabled="isDisabled">
              <i class="fa fa-plus-circle" aria-hidden="true"><strong> Add</strong></i>
            </button>

          </div>
        </div>

        <ul class="list-group">
            <li class="shadow mb-4 list-group-item animate__animated animate__fadeInDown" v-for="list, remove in lists">

              <span v-if="list.isDone" class="strike">{{list.text}}</span>
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

    <div v-else class="dark">
      <div>
        <nav class="navbar navbar-expand navbar-lg">
          <h2>Dark mode on</h2>
          <label class="switch">
            <input type="checkbox" @click="toggleDark">
            <span class="slider round"></span>
          </label>
        </nav>
      </div>

      <div class="container-fluid col-lg-6">
        <div class="card bg-dark text-center shadow my-5">
          <div class="card-header"><h4>List your to-do for tonight!</h4></div>
          <div class="card-body">
      
            <input class="form-control" type='text' v-model="addTodo" v-on:keyup.enter="addList">

            <button class="btn btn-success btn-lg my-2" @click='addList' :disabled="isDisabled">
              <i class="fa fa-plus-circle" aria-hidden="true"><strong> Add</strong></i>
            </button>

          </div>
        </div>

        <ul class="list-group">
            <li class="shadow bg-dark mb-4 list-group-item animate__animated animate__fadeInDown" v-for="list, remove in lists">

              <span v-if="list.isDone" class="strikeDark">{{list.text}}</span>
              <span v-else>{{list.text}}</span>

              <button class="close cDark float-right" aria-label="Close" @click="removeList(remove)">
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
      addTodo: '',
      mode: false,
      lists: [
        {text: "Clean the room", isDone: false},
        {text: "Cook food", isDone: false},
        {text: "Sleep", isDone: true}
      ] 
    }
  },

  methods: {
    addList() {
      this.lists.push({text: this.addTodo, isDone: false});
      this.addTodo = '';
    },

    removeList(remove) {
      this.$delete(this.lists, remove);
    },

    toggleDone(list) {
      list.isDone = !list.isDone;
    },

    toggleDark() {
      if (this.mode === true) {
        this.mode = false
      } else {
        this.mode = true
      }
    }
  },

  computed: {
    isDisabled() {
      return this.addTodo.length === 0;
    }
  }

});

new Vue({
  el: '#app'
});