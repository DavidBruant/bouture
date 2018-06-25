const Bouture = {}
const TAGSWITHATTRIBUTES = new Map([
  ['a', new Set(['download', 'href', 'hreflang', 'media', 'ping', 'rel', 'shape', 'target'])],
  ['abbr', new Set()],
  ['address', new Set()],
  ['area', new Set(['alt', 'coords', 'download', 'href', 'hreflang', 'media', 'ping', 'rel', 'shape', 'target'])],
  ['article', new Set()],
  ['aside', new Set()],
  ['audio', new Set(['autoplay', 'buffered', 'controls', 'crossorigin', 'loop', 'muted', 'preload', 'src'])],
  ['b', new Set()],
  ['base', new Set(['href', 'target'])],
  ['bdi', new Set()],
  ['bdo', new Set()],
  ['blockquote', new Set(['cite'])],
  ['body', new Set(['bgcolor'])],
  ['button', new Set(['autofocus', 'disabled', 'form', 'formaction', 'name', 'type', 'value'])],
  ['canvas', new Set(['height', 'width'])],
  ['caption', new Set(['align'])],
  ['cite', new Set()],
  ['code', new Set()],
  ['col', new Set(['align', 'bgcolor', 'span'])],
  ['colgroup', new Set(['align', 'bgcolor', 'span'])],
  ['data', new Set()],
  ['datalist', new Set()],
  ['dd', new Set()],
  ['del', new Set(['cite', 'datetime'])],
  ['details', new Set(['open'])],
  ['dfn', new Set()],
  ['dialog', new Set()],
  ['div', new Set()],
  ['dl', new Set()],
  ['dt', new Set()],
  ['em', new Set()],
  ['embed', new Set(['height', 'src', 'type', 'width'])],
  ['fieldset', new Set(['disabled', 'form', 'name'])],
  ['figcaption', new Set()],
  ['figure', new Set()],
  ['footer', new Set()],
  ['form', new Set(['accept', 'accept-charset', 'action', 'autocomplete', 'enctype', 'method', 'name', 'novalidate', 'target'])],
  ['h1', new Set()],
  ['h2', new Set()],
  ['h3', new Set()],
  ['h4', new Set()],
  ['h5', new Set()],
  ['h6', new Set()],
  ['head', new Set()],
  ['header', new Set()],
  ['hgroup', new Set()],
  ['hr', new Set(['align', 'color'])],
  ['i', new Set()],
  ['iframe', new Set()],
  ['hgroup', new Set()],
  ['html', new Set(['manifest'])],
  ['iframe', new Set(['align', 'height', 'name', 'sandbox', 'seamless', 'src', 'srcdoc', 'width'])],
  ['img', new Set(['align', 'alt', 'border', 'crossorigin', 'height', 'ismap', 'sizes', 'src', 'srcset', 'usemap', 'width'])],
  ['input', new Set(['accept', 'alt', 'autocomplete', 'autofocus', 'checked', 'dirname', 'disabled', 'form', 'formaction', 'height', 'list', 'max', 'maxlength', 'minlength', 'min', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'src', 'step', 'type', 'usemap', 'value', 'width'])],
  ['ins', new Set(['cite', 'datetime'])],
  ['kbd', new Set()],
  ['label', new Set(['for', 'form'])],
  ['legend', new Set()],
  ['li', new Set(['value'])],
  ['link', new Set(['crossorigin', 'href', 'hreflang', 'integrity', 'media', 'rel', 'sizes'])],
  ['main', new Set()],
  ['map', new Set(['name'])],
  ['mark', new Set()],
  ['meta', new Set(['charset', 'content', 'http-equiv', 'name'])],
  ['meter', new Set(['form', 'high', 'low', 'max', 'min', 'optimum', 'value'])],
  ['nav', new Set()],
  ['noscript', new Set()],
  ['object', new Set(['border', 'data', 'form', 'height', 'name', 'type', 'usemap', 'width'])],
  ['ol', new Set(['reversed', 'start'])],
  ['optgroup', new Set(['disabled'])],
  ['option', new Set(['disabled', 'selected', 'value'])],
  ['output', new Set(['for', 'form', 'name'])],
  ['p', new Set()],
  ['param', new Set(['name', 'value'])],
  ['picture', new Set()],
  ['pre', new Set()],
  ['progress', new Set(['form', 'max', 'value'])],
  ['q', new Set(['cite'])],
  ['rp', new Set()],
  ['rt', new Set()],
  ['rtc', new Set()],
  ['ruby', new Set()],
  ['s', new Set()],
  ['samp', new Set()],
  ['script', new Set(['async', 'charset', 'crossorigin', 'defer', 'integrity', 'language', 'src', 'type'])],
  ['section', new Set()],
  ['select', new Set(['autofocus', 'disabled', 'form', 'multiple', 'name', 'required', 'size'])],
  ['slot', new Set()],
  ['small', new Set()],
  ['source', new Set(['media', 'sizes', 'src', 'type'])],
  ['source', new Set()],
  ['span', new Set()],
  ['strong', new Set()],
  ['style', new Set(['media', 'scoped', 'type'])],
  ['sub', new Set()],
  ['summary', new Set()],
  ['sup', new Set()],
  ['table', new Set(['align', 'bgcolor', 'border', 'summary'])],
  ['tbody', new Set(['align', 'bgcolor'])],
  ['td', new Set(['align', 'bgcolor', 'colspan', 'headers', 'rowspan'])],
  ['template', new Set()],
  ['textarea', new Set(['autofocus', 'cols', 'dirname', 'disabled', 'form', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'wrap'])],
  ['tfoot', new Set(['align', 'bgcolor'])],
  ['th', new Set(['align', 'bgcolor', 'colspan', 'headers', 'rowspan', 'scope'])],
  ['thead', new Set(['align'])],
  ['time', new Set(['datetime'])],
  ['tr', new Set(['align', 'bgcolor'])],
  ['track', new Set(['default', 'kind', 'label', 'src', 'srclang'])],
  ['u', new Set()],
  ['ul', new Set()],
  ['var', new Set()],
  ['video', new Set(['autoplay', 'buffered', 'controls', 'crossorigin', 'height', 'loop', 'muted', 'poster', 'preload', 'src', 'width'])],
  ['wbr', new Set()]
])
const GLOBALATTRIBUTES = new Set(['accesskey', 'autocapitalize', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'is', 'itemid', 'itemprop', 'itemref', 'itemscope', 'itemtype', 'lang', 'slot', 'spellcheck', 'style', 'tabindex', 'title', 'translate'])
const EVENTNAMES = new Set(['abort', 'blur', 'error', 'focus', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'contextmenu', 'cuechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'gotpointercapture', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadend', 'loadstart', 'lostpointercapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'wheel', 'pause', 'play', 'playing', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'progress', 'ratechange', 'reset', 'scroll', 'seeked', 'seeking', 'select', 'selectstart', 'selectionchange', 'show', 'stalled', 'submit', 'suspend', 'timeupdate', 'volumechange', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitioncancel', 'transitionend', 'waiting'])

TAGSWITHATTRIBUTES.forEach((attributes, tagName) => {
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

      TAGSWITHATTRIBUTES.forEach((attributes, tagName) => {
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
              const tagWithAttributes = TAGSWITHATTRIBUTES.get(tag)
              
              if (name.match(/^data/)) {
                return !!name.match(/^data(-[a-z0-9][a-z0-9\.:_]*)*$/)
              } else if (tagWithAttributes.has(name) || GLOBALATTRIBUTES.has(name)) {
                return true
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
