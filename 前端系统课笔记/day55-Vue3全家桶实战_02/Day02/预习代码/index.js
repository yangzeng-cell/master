const app = Vue.createApp({
  data: function() {
    return {
      books
    }
  },
  computed: {
    totalPrice() {
      return this.books.reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0)
    }
  },
  methods: {
    removeItem(index) {
      this.books.splice(index, 1)
    },
    increment(index) {
      this.books[index].count++
    },
    decrement(index) {
      this.books[index].count--
    }
  }
})

app.mount("#app")