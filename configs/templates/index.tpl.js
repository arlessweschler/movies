function getScript(hash, filename) {
  return `${('script(src="/js/' + filename + '.' + hash + '.js")')}`;
}

function getStyle(hash, filename) {
  return `${('link(rel="stylesheet", type="text/css", href="/' + filename + '.' + hash + '.css")')}`;
}

module.exports = function (compilation = {}) {
  const { hash } = compilation;

  return `
doctype html
html(lang="en")

head
  meta(charset="utf-8")
  title Webpack4__boilerplate__nk11dev
  ${hash && getStyle(hash, 'main')}

body
  h1 Index.html from pug
  div#root
  ${hash && getScript(hash, 'main')}
  ${hash && getScript(hash, 'vendor_sync')}
`;
}