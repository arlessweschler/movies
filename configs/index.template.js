function getScript(hash, filename, ext) {
  return `${(typeof hash !== 'undefined' ? `script(type="text/javascript", src="/js/${filename}.${hash}.${ext}")` : '')}`;
}

function getStyle(hash, filename) {
  return `${(typeof hash !== 'undefined' ? `link(rel="stylesheet", type="text/css", href="/css/${filename}.${hash}.css")` : '')}`;
}

function favicon() {
  return `
  link(rel="shortcut icon", href="/favicon.ico", type="image/x-icon")`;
}

function font(filename) {
  return `
  link(rel="preload", crossorigin, as="font", type="font/woff2", href="/assets/fonts/${filename}.woff2")`;
}

function printRenderingType() {
  return `
  if IS_SSR
    <!-- RENDERING-SSR -->
  else
    <!-- RENDERING-CSR -->
  `;
}

module.exports = (compilation = {}) => {
  const { hash } = compilation;

  return `
doctype html
html(lang="en")

  ${printRenderingType()}
  ${favicon()}
  ${font('bebas-neue-v2-latin-regular')}
  ${font('manrope-v4-latin-regular')}

  head
    meta(charset="utf-8")
    meta(name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1")
    if IS_SSR
      !=pageTitle
    else
      title Movies
    ${getStyle(hash, 'app')}

  body
    if IS_SSR
      div#root !{rootContent}
      script.
        window.__PRELOADED_STATE__ = !{preloadedState}
    else
      div#root

    ${getScript(hash, 'vendor', 'js')}
    ${getScript(hash, 'app', 'js')}
`;
};