import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  // Individual API routes

  /** Get all of a list */

  static async getList(type, data={}) {
    let res = await this.request(type, data);
    return res[type];
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a job by handle. */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  //manage authorization

  static async login(username, password){
    let res = await this.request("auth/token",{username:username, password:password}, "post" );
    return res.token;
  }

  static async signup(formData){
    let res = await this.request("auth/register",
                                  {
                                    username: formData.username,
                                    password: formData.password,
                                    firstName: formData.first_name,
                                    lastName: formData.last_name,
                                    email: formData.email
                                  },"post");  
    return res.token;
  }

  //retrieves user data
  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //updates user data

  static async updateUser(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    console.log(res);
    return res.user;
  }

  //apply current user to a job
  static async apply(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
    return res.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
