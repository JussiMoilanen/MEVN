<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs4 class="grey lighten-4">
        <v-container class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h3>Login</h3>
            </v-card-title>
            <v-form>
              <v-text-field
                prepend-icon="person"
                type="text"
                name="username"
                v-model="username"
                placeholder="username"
              />
              <v-text-field
                prepend-icon="lock"
                type="password"
                name="password"
                v-model="password"
                placeholder="password"
              />
              <v-text-field class="error" v-html="error"></v-text-field>
              <v-card-actions>
                <v-btn primary large block @click="login">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
        <v-alert v-if="token">Username {{username}} and token {{token}}</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostService from "../PostService";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
      loggedIn: false,
      token: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await PostService.login({
          username: this.username,
          password: this.password
        });
        this.token = response.data.token;
        this.loggedIn = true;
      } catch (error) {
        this.error = error.response;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>