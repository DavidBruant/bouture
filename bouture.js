const Bouture = {}
const TAGNAMES = new Set(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'])
const EVENTNAMES = new Set(['abort', 'blur', 'error', 'focus', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'contextmenu', 'cuechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'gotpointercapture', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadend', 'loadstart', 'lostpointercapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'wheel', 'pause', 'play', 'playing', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'progress', 'ratechange', 'reset', 'scroll', 'seeked', 'seeking', 'select', 'selectstart', 'selectionchange', 'show', 'stalled', 'submit', 'suspend', 'timeupdate', 'volumechange', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitioncancel', 'transitionend', 'waiting'])
const ATTRIBUTENAMESWITHTAGS = new Map([
  ['accept', new Set(['form', 'input'])],
  ['accept-charset', new Set('form')],
  ['accesskey', new Set('*')],
  ['action', new Set('form')],
  ['align', new Set(['applet', 'caption', 'col', 'colgroup', 'hr', 'iframe', 'img', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'])],
  ['alt', new Set(['applet', 'area', 'img', 'input'])],
  ['async', new Set('script')],
  ['autocapitalize', new Set('*')],
  ['autocomplete', new Set(['form', 'input'])],
  ['autofocus', new Set(['button', 'input', 'keygen', 'select', 'textarea'])],
  ['autoplay', new Set(['audio', 'video'])],
  ['bgcolor', new Set(['body', 'col', 'colgroup', 'marquee', 'table', 'tbody', 'tfoot', 'td', 'th', 'tr'])],
  ['border', new Set(['img', 'object', 'table'])],
  ['buffered', new Set(['audio', 'video'])],
  ['challenge', new Set('keygen')],
  ['charset', new Set(['meta', 'script'])],
  ['checked', new Set(['command', 'input'])],
  ['cite', new Set(['blockquote', 'del', 'ins', 'q'])],
  ['class', new Set('*')],
  ['code', new Set('applet')],
  ['codebase', new Set('applet')],
  ['color', new Set(['basefont', 'font', 'hr'])],
  ['cols', new Set('textarea')],
  ['colspan', new Set(['td', 'th'])],
  ['content', new Set('meta')],
  ['contenteditable', new Set('*')],
  ['contextmenu', new Set('*')],
  ['controls', new Set(['audio', 'video'])],
  ['coords', new Set('area')],
  ['crossorigin', new Set(['audio', 'img', 'link', 'script', 'video'])],
  ['data', new Set('object')],
  ['datetime', new Set(['del', 'ins', 'time'])],
  ['default', new Set('track')],
  ['defer', new Set('script')],
  ['dir', new Set('*')],
  ['dirname', new Set(['input', 'textarea'])],
  ['disabled', new Set(['button', 'command', 'fieldset', 'input', 'keygen', 'optgroup', 'option', 'select', 'textarea'])],
  ['download', new Set(['a', 'area'])],
  ['draggable', new Set('*')],
  ['dropzone', new Set('*')],
  ['enctype', new Set('form')],
  ['for', new Set(['label', 'output'])],
  ['form', new Set(['button', 'fieldset', 'input', 'keygen', 'label', 'meter', 'object', 'output', 'progress', 'select', 'textarea'])],
  ['formaction', new Set(['input', 'button'])],
  ['headers', new Set(['td', 'th'])],
  ['height', new Set(['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'])],
  ['hidden', new Set('*')],
  ['high', new Set('meter')],
  ['href', new Set(['a', 'area', 'base', 'link'])],
  ['hreflang', new Set(['a', 'area', 'link'])],
  ['http-equiv', new Set('meta')],
  ['icon', new Set('command')],
  ['id', new Set('*')],
  ['integrity', new Set(['link', 'script'])],
  ['ismap', new Set('img')],
  ['itemprop', new Set('*')],
  ['keytype', new Set('keygen')],
  ['kind', new Set('track')],
  ['label', new Set('track')],
  ['lang', new Set('*')],
  ['language', new Set('script')],
  ['list', new Set('input')],
  ['loop', new Set(['audio', 'bgsound', 'marquee', 'video'])],
  ['low', new Set('meter')],
  ['manifest', new Set('html')],
  ['max', new Set(['input', 'meter', 'progress'])],
  ['maxlength', new Set(['input', 'textarea'])],
  ['minlength', new Set(['input', 'textarea'])],
  ['media', new Set(['a', 'area', 'link', 'source', 'style'])],
  ['method', new Set('form')],
  ['min', new Set(['input', 'meter'])],
  ['multiple', new Set(['input', 'select'])],
  ['muted', new Set(['audio', 'video'])],
  ['name', new Set(['button', 'form', 'fieldset', 'iframe', 'input', 'keygen', 'object', 'output', 'select', 'textarea', 'map', 'meta', 'param'])],
  ['novalidate', new Set('form')],
  ['open', new Set('details')],
  ['optimum', new Set('meter')],
  ['pattern', new Set('input')],
  ['ping', new Set(['a', 'area'])],
  ['placeholder', new Set(['input', 'textarea'])],
  ['poster', new Set('video')],
  ['preload', new Set(['audio', 'video'])],
  ['radiogroup', new Set('command')],
  ['readonly', new Set(['input', 'textarea'])],
  ['rel', new Set(['a', 'area', 'link'])],
  ['required', new Set(['input', 'select', 'textarea'])],
  ['reversed', new Set('ol')],
  ['rows', new Set('textarea')],
  ['rowspan', new Set(['td', 'th'])],
  ['sandbox', new Set('iframe')],
  ['scope', new Set('th')],
  ['scoped', new Set('style')],
  ['seamless', new Set('iframe')],
  ['selected', new Set('option')],
  ['shape', new Set(['a', 'area'])],
  ['size', new Set(['input', 'select'])],
  ['sizes', new Set(['link', 'img', 'source'])],
  ['slot', new Set('*')],
  ['span', new Set(['col', 'colgroup'])],
  ['spellcheck', new Set('*')],
  ['src', new Set(['audio', 'embed', 'iframe', 'img', 'input', 'script', 'source', 'track', 'video'])],
  ['srcdoc', new Set('iframe')],
  ['srclang', new Set('track')],
  ['srcset', new Set('img')],
  ['start', new Set('ol')],
  ['step', new Set('input')],
  ['style', new Set('*')],
  ['summary', new Set('table')],
  ['tabindex', new Set('*')],
  ['target', new Set(['a', 'area', 'base', 'form'])],
  ['title', new Set('*')],
  ['translate', new Set('*')],
  ['type', new Set(['button', 'input', 'command', 'embed', 'object', 'script', 'source', 'style', 'menu'])],
  ['usemap', new Set(['img', 'input', 'object'])],
  ['value', new Set(['button', 'option', 'input', 'li', 'meter', 'progress', 'param'])],
  ['width', new Set(['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'])],
  ['wrap', new Set('textarea')]
])

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
              } else if (ATTRIBUTENAMESWITHTAGS.has(name)) {
                const attributeWithTag = ATTRIBUTENAMESWITHTAGS.get(name)
                if (attributeWithTag.has('*') || attributeWithTag.has(tag)) {
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
