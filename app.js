new Vue({
  el: '#app',
  data: {
    addTodo: '',
    lists: [
      {text: "Clean the room", isDone: false},
      {text: "Cook food", isDone: false},
      {text: "Study Vue", isDone: true},
      {text: "Sleep", isDone: true},
    ] 
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
  }
});