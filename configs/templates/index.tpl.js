function getScript(hash, filename, ext) {
  return `${(typeof hash !== 'undefined' ? 'script(type="text/javascript", src="/js/' + filename + '.' + hash + '.' + ext + '")' : '')}`;
}

function getStyle(hash, filename) {
  return `${(typeof hash !== 'undefined' ? 'link(rel="stylesheet", type="text/css", href="/css/' + filename + '.' + hash + '.css")' : '')}`;
}

function favicon() {
  return `
  link(rel="shortcut icon", href="/favicon.ico", type="image/x-icon")`;
}

function printRenderingType() {
  return `
  if IS_SSR
    <!-- RENDERING-SSR -->
  else
    <!-- RENDERING-CSR -->
  `;
}

module.exports = function (compilation = {}) {
  const { hash } = compilation;

  return `
doctype html
html(lang="en")

  ${printRenderingType()}
  ${favicon()}

  head
    meta(charset="utf-8")
    title Webpack4__boilerplate__nk11dev
    ${getStyle(hash, 'vendor')}
    ${getStyle(hash, 'main')}

  body
    if IS_SSR
      div#root !{rootContent}
      script.
        window.__PRELOADED_STATE__ = !{preloadedState}
    else
      div#root

    ${getScript(hash, 'vendor', 'chunk.js')}
    ${getScript(hash, 'main', 'js')}
`;
}