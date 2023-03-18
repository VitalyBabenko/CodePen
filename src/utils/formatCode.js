import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import parserJs from 'prettier/parser-babel';

export const formatCode = (value, language) => {
  const parser = {
    HTML: 'html',
    xml: 'html',
    CSS: 'css',
    css: 'css',
    JS: 'babel',
    javascript: 'babel',
  };

  const formattedCode = prettier.format(value, {
    parser: parser[language],
    plugins: [parserHtml, parserCss, parserJs],
    tabWidth: 2,
    useTabs: false,
  });

  return formattedCode;
};
