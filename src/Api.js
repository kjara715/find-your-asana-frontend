import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class YogaApi {
  // the token for interactive with the API will be stored here.
  // static token;

  constructor(token) {
    this.token = token || null;
  }


  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async signUp(userData){
    let res = await this.request('auth/register', userData, "post")
    this.token = res.token
    return res.token
  }

  static async login(userData){
    try{
      let res = await this.request('auth/token', userData, "post");
      this.token = res.token;
      return res.token
    } catch (e) {
      console.log("Error:", e)
    }
    
    
  }

  static async getUser(username){
    try {
      let res=await this.request(`users/${username}`);
      return res.user
    } catch (e) {
      console.log("Error:", e)
    }
  }

  static async updateUser(username, userData){
    try {
      let res=await this.request(`users/${username}`, userData, "patch");
      return res.user
    } catch (e) {
      console.log("Error:", e)
    }
  }

  static async deleteUser(username){
    try {
      await this.request(`users/${username}`, {}, "delete");
    } catch (e) {
      console.log("Error:", e)
    }
  }

  static async createPost(username, postData){
    try {
      let res=await this.request(`users/${username}/create-post`, postData, "post");
      return res.post
    } catch (e) {
      console.log("Error:", e)
    }
  }



  static async uploadImage(imageData) {
    
    try { 
      let res= await this.request(`posts/api/upload`, imageData, "post");
      return res
      
    } catch (e) {
        console.log(e)
    }
}


  static async deletePost(username, id){
    try {
      await this.request(`posts/${username}/${id}`, {}, "delete");
      
    } catch (e) {
      console.log("Error:", e)
    }
  }

  static async getPosts(pin){
    try {
      let res=await this.request(`posts?pin=${pin}`);
      return res.posts
    } catch (e) {
      console.log("Error:", e)
    }
  }

  

  static async updatePost(username, id, patchData){
    try {
      let res=await this.request(`posts/${username}/${id}`, patchData, "patch");
      return res.post
    } catch (e) {
      console.log("Error:", e)
    }
  }
 

  
//External API routes
//lightning yoga api
  static async getYogaCategories (){
    let res = await axios.get("https://lightning-yoga-api.herokuapp.com/yoga_categories")
    return res.data.items
}

static async getCategory(id){
    let res = await axios.get(`https://lightning-yoga-api.herokuapp.com/yoga_categories/${id}`)
    return res.data
}

static async getAllPoses(){
  try {
    let res=await axios.get("https://lightning-yoga-api.herokuapp.com/yoga_poses")
    return res.data.items
  } catch (e) {
    console.log("Error:", e)
  }
}

static async getPose(id){
  try {
    let res = await axios.get(`https://lightning-yoga-api.herokuapp.com/yoga_poses/${id}`)
    return res.data
  } catch (e) {
    console.log("Error:", e)
  }
    
}
}



export default YogaApi