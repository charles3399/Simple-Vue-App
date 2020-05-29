Vue.component('todolists', {
  template: `
    <div>
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
  `,

  data() {
    return {
      addTodo: '',
      lists: [
        {text: "Clean the room", isDone: false},
        {text: "Cook food", isDone: false},
        {text: "Study Vue", isDone: true},
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