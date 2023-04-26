export const setEmptyFilesInLS = () => {
  localStorage.setItem(
    'localFiles',
    JSON.stringify({
      html: { type: 'HTML', text: '' },
      css: { type: 'CSS', text: '' },
      js: { type: 'JS', text: '' },
    })
  );
};
