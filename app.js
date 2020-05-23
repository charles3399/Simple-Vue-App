new Vue({
  el: '#app',
  data: {
    newList: '',
    lists: []
  },

  methods: {
    addList() {
      this.lists.push(this.newList);
      this.newList = '';
    },

    removeList(remove) {
      this.$delete(this.lists, remove);
    }
  }
});