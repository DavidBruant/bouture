const Bouture = {
  completeElement: (tag, args) => {
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
            .forEach(attributeName => {
              const attributeValue = arg[attributeName]
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
}
const tagNames = new Set(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'])

tagNames.forEach(tagName => {
  Object.defineProperty(Bouture, tagName, {
    get: function () {
      let tags = [{name: tagName, args: []}]
      function branche (...args) {
        const lastTag = tags.pop()
        tags.push({name: lastTag.name, args: args})
        return branche
      }

      Object.defineProperty(branche, 'getElement', {
        value: function () {
          let elements = []
          tags.forEach((tag, index) => {
            if (!index) {
              elements = Bouture.completeElement(tag.name, tag.args)
            } else {
              elements.append(Bouture.completeElement(tag.name, tag.args))
            }
          })
          return elements
        }
      })

      tagNames.forEach(tagName => {
        Object.defineProperty(branche, tagName, {
          get: function () {
            tags.push({name: tagName, args: []})
            return branche
          }
        })
      })
      return branche
    }
  })
})

export default Bouture
