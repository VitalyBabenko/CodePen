import { GraphQLClient } from "graphql-request";

const endpoint = "/graphql";
const gql = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Accept: "application/json",
    Authorization: localStorage.authToken
      ? `Bearer ${localStorage.authToken}`
      : "",
  },
});

export class User {
  constructor() {
    this._id = "";
    this.login = "";
    this.works = "";
  }

  static isAuth() {
    const authToken = localStorage.getItem("authToken");
    return authToken ? authToken.length > 50 : false;
  }

  static async login(login, password) {
    const resp = await gql.request(
      `query login($login: String!,$password: String!) {
            login(login: $login, password: $password)
        }`,
      {
        login,
        password,
      }
    );

    localStorage.authToken = resp.login;
    return resp.login;
  }

  static async createUser(login, password) {
    const query = `
      mutation createUser($login: String!,$password: String!) {
        createUser(login: $login, password: $password) {
          _id
          login
        }
      }`;

    try {
      const resp = await gql.request(
        query,
        JSON.stringify({ login, password })
      );
      if (resp.createUser._id) {
        await this.login(login, password);
        this.id = resp.createUser._id;
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async getInfo(id = "5dade727e5b3e4260300870d") {
    const query = `
    query getUserInfo{
      UserFindOne(query: "[{\\"_id\\":\\"${id}\\"}]" ) {
        _id
        login
        createdAt
      }
    }`;

    try {
      const { UserFindOne } = await gql.request(query);
      return UserFindOne;
    } catch (error) {
      console.error(error);
    }
  }

  static async getWorks() {
    const query = `
    query SnippetByOwner {
      SnippetFind(query: "[{\\"___owner\\":{\\"$in\\": [\\"5dade727e5b3e4260300870d\\"]} }]") {
        _id
        createdAt
        title
        description
        owner {
          _id
          login
        }
      }
    }`;

    try {
      const { SnippetFind } = await gql.request(query);
      return SnippetFind;
    } catch (error) {
      console.error(error);
    }
  }

  static async addWork(title, description) {
    const query = `
      mutation addWork {
        SnippetUpsert(snippet: {title:"${title}",description: "${description}"}) {
          _id
        }
      }`;

    try {
      const data = await gql.request(query);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
