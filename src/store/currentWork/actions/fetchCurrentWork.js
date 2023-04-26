import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import { setEmptyFilesInLS } from '../../../utils/setEmptyFilesInLS';

export const fetchCurrentWork = createAsyncThunk(
  'currentWork/fetch',

  async id => {
    if (!id) {
      if (!localStorage.getItem('localFiles')) {
        setEmptyFilesInLS();
      }
      return {
        _id: null,
        title: 'Untitled',
        owner: { login: 'Captain anonymous' },
        files: JSON.parse(localStorage.getItem('localFiles')),
      };
    }

    const gql = getGql();
    try {
      const { SnippetFindOne } = await gql.request(
        `
        query SnippetById($query: String!) {
            SnippetFindOne(query: $query) {
              _id
              title
              owner {
                _id
                login
              }
              files {
                _id
                text
                type
              }
            }
          }
        `,
        {
          query: JSON.stringify([{ _id: id }]),
        }
      );
      const files = {
        html: {},
        css: {},
        js: {},
      };

      SnippetFindOne.files.forEach(file => {
        if (file.type === 'HTML') files.html = file;
        if (file.type === 'CSS') files.css = file;
        if (file.type === 'JS') files.js = file;
      });

      return { ...SnippetFindOne, files: files };
    } catch (error) {
      console.error(error);
    }
  }
);
