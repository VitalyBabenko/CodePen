export const queries = {
  updateWorkInfo(id, title, description) {
    return `
      mutation updateWork {
        SnippetUpsert(snippet:{ _id: "${id}" title:"${title}",description: "${description}"}) {
          _id
          title
          description
          createdAt
        }
      }`;
  },

  getWork(id) {
    return `query Snippet {
      SnippetFindOne(query: "[{\\"_id\\":\\"${id}\\"}]") {
        _id
        createdAt
        title
        description
        files {
          _id
          text
          type
        }
      }
    }`;
  },
};
