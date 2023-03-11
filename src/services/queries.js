export const queries = {
  getWorks(id) {
    return `
      query SnippetByOwner {
        SnippetFind(query: "[{\\"___owner\\":{\\"$in\\": [\\"${id}\\"]} }]") {
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

  // addWork(title, description) {
  //   return `
  //     mutation addWork {
  //       SnippetUpsert(snippet: {title:"${title}",description: "${description}"}) {
  //         _id
  //         title
  //         description
  //         createdAt
  //       }
  //     }`;
  // },

  addWork(title, description) {
    return `
      mutation addWork {
        SnippetUpsert(snippet: {title:"${title}",description: "${description}", files:[ { text: "", type: "HTML" } ,  { text: "", type: "CSS" } , { text: "", type: "JS" } ]}) {
          _id
          title
          description
          createdAt
          files {
            text
            type
          }
        }
      }`;
  },

  // updateWork(id, html, css, js) {
  //   return `
  //   mutation SnippetUpdate {
  //     SnippetUpsert(snippet: {
  //       _id: "${id}",
  //       files:[
  //         {type: "HTML", text: "${html}"},
  //         {type: "CSS", text: "${css}"},
  //         {type: "JS", text: "${js}"},
  //       ]
  //     }) {
  //       _id
  //       createdAt
  //       title
  //       description
  //       files {
  //         text
  //         type
  //       }
  //     }
  //   }
  //   `;
  // },

  // updateWork(id,) {
  //   return `
  //     mutation SnippetUpdate($id: String!, $files: [FileInput!]) {
  //       SnippetUpsert(snippet: {
  //         _id: $id,
  //         files: $files
  //       }) {
  //         _id
  //         createdAt
  //         title
  //         description
  //         files {
  //           text
  //           type
  //         }
  //       }
  //     }
  //   `;
  // },
  deleteWork(id) {
    return `
      mutation updateWork {
        SnippetUpsert(snippet:{ _id: "${id}" title:null}) {
          _id
          title
          description
          createdAt

        }
      }`;
  },

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
