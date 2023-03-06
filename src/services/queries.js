export const queries = {
  login: `
    query login($login: String!,$password: String!) {
        login(login: $login, password: $password)
    }`,

  createUser: `
    mutation createUser($login: String!,$password: String!) {
        createUser(login: $login, password: $password) {
            _id
            login
        }
    }`,

  getInfo(id) {
    return `
        query getUserInfo{
            UserFindOne(query: "[{\\"_id\\":\\"${id}\\"}]" ) {
                _id
                createdAt
                login
                nick  
            }
        }`;
  },

  getWorks(id) {
    return `
      query SnippetByOwner {
        SnippetFind(query: "[{\\"___owner\\":{\\"$in\\": [\\"${id}\\"]} }]") {
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
  },

  addWork(title, description) {
    return `
      mutation addWork {
        SnippetUpsert(snippet: {title:"${title}",description: "${description}"}) {
          _id
          title
          description
          createdAt
        }
      }`;
  },

  deleteWork(id) {
    return `
      mutation removeWork {
        SnippetDelete(snippet: {_id:"${id}"}) {
            _id
            owner {
              login
            }
        }
      }`;
  },
};
