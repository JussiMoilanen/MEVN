import axios from "axios";

const url = "http://localhost:8000/api/items/";
const register = "http://localhost:8000/api/register";
const login = "http://localhost:8000/api/login";

class PostService {
  //getItems
  static getItems() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(item => ({
            ...item
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // create Post

  static insertItem(text) {
    return axios.post(url, {
      item: text
    });
  }
  // handle delete
  // take url, add id, make axios delete call
  static deleteItem(id) {
    return axios.delete(`${url}${id}`);
  }

  static register(credentials) {
    return axios.post(register, credentials);
  }
  static login(credentials) {
    return axios.post(login, credentials);
  }
}

export default PostService;
