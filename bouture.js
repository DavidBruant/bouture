const Bouture = {}
const TAGNAMES = new Set(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'])
const EVENTNAMES = new Set(['abort', 'blur', 'error', 'focus', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'contextmenu', 'cuechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'gotpointercapture', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadend', 'loadstart', 'lostpointercapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'wheel', 'pause', 'play', 'playing', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'progress', 'ratechange', 'reset', 'scroll', 'seeked', 'seeking', 'select', 'selectstart', 'selectionchange', 'show', 'stalled', 'submit', 'suspend', 'timeupdate', 'volumechange', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitioncancel', 'transitionend', 'waiting'])
const ATTRIBUTENAMESWITHTAGS = {
  accept: ['form', 'input'],
  'accept-charset': 'form',
  accesskey: '*',
  action: 'form',
  align: ['applet', 'caption', 'col', 'colgroup', 'hr', 'iframe', 'img', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'],
  alt: ['applet', 'area', 'img', 'input'],
  async: 'script',
  autocapitalize: '*',
  autocomplete: ['form', 'input'],
  autofocus: ['button', 'input', 'keygen', 'select', 'textarea'],
  autoplay: ['audio', 'video'],
  bgcolor: ['body', 'col', 'colgroup', 'marquee', 'table', 'tbody', 'tfoot', 'td', 'th', 'tr'],
  border: ['img', 'object', 'table'],
  buffered: ['audio', 'video'],
  challenge: 'keygen',
  charset: ['meta', 'script'],
  checked: ['command', 'input'],
  cite: ['blockquote', 'del', 'ins', 'q'],
  class: '*',
  code: 'applet',
  codebase: 'applet',
  color: ['basefont', 'font', 'hr'],
  cols: 'textarea',
  colspan: ['td', 'th'],
  content: 'meta',
  contenteditable: '*',
  contextmenu: '*',
  controls: ['audio', 'video'],
  coords: 'area',
  crossorigin: ['audio', 'img', 'link', 'script', 'video'],
  data: 'object',
  datetime: ['del', 'ins', 'time'],
  default: 'track',
  defer: 'script',
  dir: '*',
  dirname: ['input', 'textarea'],
  disabled: ['button', 'command', 'fieldset', 'input', 'keygen', 'optgroup', 'option', 'select', 'textarea'],
  download: ['a', 'area'],
  draggable: '*',
  dropzone: '*',
  enctype: 'form',
  for: ['label', 'output'],
  form: ['button', 'fieldset', 'input', 'keygen', 'label', 'meter', 'object', 'output', 'progress', 'select', 'textarea'],
  formaction: ['input', 'button'],
  headers: ['td', 'th'],
  height: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'],
  hidden: '*',
  high: 'meter',
  href: ['a', 'area', 'base', 'link'],
  hreflang: ['a', 'area', 'link'],
  'http-equiv': 'meta',
  icon: 'command',
  id: '*',
  integrity: ['link', 'script'],
  ismap: 'img',
  itemprop: '*',
  keytype: 'keygen',
  kind: 'track',
  label: 'track',
  lang: '*',
  language: 'script',
  list: 'input',
  loop: ['audio', 'bgsound', 'marquee', 'video'],
  low: 'meter',
  manifest: 'html',
  max: ['input', 'meter', 'progress'],
  maxlength: ['input', 'textarea'],
  minlength: ['input', 'textarea'],
  media: ['a', 'area', 'link', 'source', 'style'],
  method: 'form',
  min: ['input', 'meter'],
  multiple: ['input', 'select'],
  muted: ['audio', 'video'],
  name: ['button', 'form', 'fieldset', 'iframe', 'input', 'keygen', 'object', 'output', 'select', 'textarea', 'map', 'meta', 'param'],
  novalidate: 'form',
  open: 'details',
  optimum: 'meter',
  pattern: 'input',
  ping: ['a', 'area'],
  placeholder: ['input', 'textarea'],
  poster: 'video',
  preload: ['audio', 'video'],
  radiogroup: 'command',
  readonly: ['input', 'textarea'],
  rel: ['a', 'area', 'link'],
  required: ['input', 'select', 'textarea'],
  reversed: 'ol',
  rows: 'textarea',
  rowspan: ['td', 'th'],
  sandbox: 'iframe',
  scope: 'th',
  scoped: 'style',
  seamless: 'iframe',
  selected: 'option',
  shape: ['a', 'area'],
  size: ['input', 'select'],
  sizes: ['link', 'img', 'source'],
  slot: '*',
  span: ['col', 'colgroup'],
  spellcheck: '*',
  src: ['audio', 'embed', 'iframe', 'img', 'input', 'script', 'source', 'track', 'video'],
  srcdoc: 'iframe',
  srclang: 'track',
  srcset: 'img',
  start: 'ol',
  step: 'input',
  style: '*',
  summary: 'table',
  tabindex: '*',
  target: ['a', 'area', 'base', 'form'],
  title: '*',
  translate: '*',
  type: ['button', 'input', 'command', 'embed', 'object', 'script', 'source', 'style', 'menu'],
  usemap: ['img', 'input', 'object'],
  value: ['button', 'option', 'input', 'li', 'meter', 'progress', 'param'],
  width: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'],
  wrap: 'textarea'
}

TAGNAMES.forEach(tagName => {
  Object.defineProperty(Bouture, tagName, {
    get: function () {
      let tags = [{name: tagName, content: []}]
      function branche (...args) {
        tags[tags.length - 1] = { name: tags[tags.length - 1].name, content: args }
        return branche
      }

      branche.getElement = () => {
        let elements
        tags.reverse().forEach(tag => {
          const current = completeElement(tag.name, tag.content)
          if (elements) {
            current.append(elements)
          }
          elements = current
        })
        return elements
      }

      TAGNAMES.forEach(tagName => {
        Object.defineProperty(branche, tagName, {
          get: function () {
            tags.push({name: tagName, content: []})
            return branche
          }
        })
      })
      return branche
    }
  })
})

function completeElement (tag, args) {
  const element = document.createElement(tag)
  args.forEach(arg => {
    switch (typeof arg) {
      case 'string':
        element.append(arg)
        break
      case 'number':
        if (!Number.isNaN(arg)) element.append(arg)
        break
      case 'object':
        if (arg === null) break
        if (Array.isArray(arg)) {
          arg.forEach(node => {
            // Check if it's a Bouture Object
            if (node.valueOf().name === 'branche' && node.hasOwnProperty('getElement')) {
              element.append(node.getElement())
            }
          })
          break
        }
        Object.keys(arg)
          .forEach(keyName => {
            function getEventName (name) {
              return name.replace(/^once|on/, '').toLowerCase()
            }

            function isAttribute (name) {
              if (name.match(/^data/)) {
                return name.match(/^data-([a-z]|[0-9]|-)*$/)
              } else if (ATTRIBUTENAMESWITHTAGS.hasOwnProperty(name)) {
                if (ATTRIBUTENAMESWITHTAGS[name] === '*' || ATTRIBUTENAMESWITHTAGS[name].indexOf(tag) !== -1) {
                  return true
                }
              }
              return false
            }

            function isEvent (name) {
              if (name.match(/^on[A-Z]|once[A-Z]/)) {
                return EVENTNAMES.has(getEventName(name))
              }
            }

            if (isEvent(keyName)) {
              const eventName = getEventName(keyName)
              const eventValue = arg[keyName]
              if (typeof eventValue === 'function') {
                const options = {once: keyName.match(/^once/)}
                element.addEventListener(eventName, eventValue, options)
              }
            } else if (isAttribute(keyName)) {
              const attributeValue = arg[keyName]
              const attributeName = keyName
              switch (typeof attributeValue) {
                case 'boolean':
                  if (attributeValue) {
                    element.setAttribute(attributeName, '')
                  }
                  break
                case 'number':
                  if (!Number.isNaN(attributeValue)) {
                    element.setAttribute(attributeName, attributeValue)
                  }
                  break
                case 'string':
                  element.setAttribute(attributeName, attributeValue)
                  break
                case 'object':
                  if (attributeValue !== null) {
                    element
                      .setAttribute(attributeName, attributeValue.join(' '))
                  }
                  break
                case 'symbol':
                  break
                case 'undefined':
                  break
              }
            }
          })
        break
      case 'function':
        break
      default:
        // Other types not handle by cases : Symbol, boolean, undefined
    }
  })
  return element
}

export default Bouture
