<template>
  <div id="app">
    <h3>{{ msg }}</h3>
    <input type="text" v-model="searchQuery">
    <div>
      <div class="item" v-for="item in autocomplete" v-show="show" @click="searchQuery = item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        msg: 'Find birds by name',
        searchQuery: '',
        autocomplete: [],
        show: true
      }
    },
    watch: {
      searchQuery (searchQuery) {
        if (!searchQuery) {
          this.autocomplete = []
        } else {
          axios.get('http://localhost:8000/data?searchQuery=' + searchQuery)
            .then(res => {
              this.autocomplete = res.data.data
              this.show = !(res.data.data.length === 1 && res.data.data[0] === this.searchQuery)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    border: solid 1px #d6d6d6;
    color: #6f6c6c;
    cursor: pointer;
  }

  .item:hover {
    background-color: #a3c7ff;
  }

  #app > * {
    width: 300px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
