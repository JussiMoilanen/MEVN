<template>
  <v-container>
    <v-layout align-center justify-center row fill-height>
      <Register />
      <login :username="username" />
      <div>
        <h3 v-if="username">User {{username}} logged in</h3>
      </div>
      <div>
        <br />
        <v-text-field type="text" id="create-item" placeholder="create a new item" v-model="text" />
        <v-btn v-on:click="createItem">Add new item</v-btn>
      </div>
      <p class="error" v-if="error">{{error}}</p>
      <div class="item-container" v-for="(item) in items" v-bind:item="item" v-bind:key="item._id">
        <p class="text">{{item.item}}</p>
        <v-btn @click="deleteItem(item._id)">delete</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import PostService from "../PostService";
import Login from "./Login";
import Register from "./Register";

export default {
  components: { Login, Register },
  name: "PostComponent",
  data() {
    return {
      items: [],
      username: "",
      error: "",
      item: "",
      text: "",
      percentCompleted: 0
    };
  },
  async created() {
    try {
      this.items = await PostService.getItems();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createItem() {
      await PostService.insertItem(this.text);
      this.items = await PostService.getItems();
    },
    async deleteItem(id) {
      await PostService.deleteItem(id);
      this.items = await PostService.getItems();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
