# Bouture

A thin wrapper around DOM APIs to create DOM branches to be appended
Inspirations: jQuery, voyeur.js

This lib provides an API to create easily DOM branches to be appended. Only creation is supported, not removing, no tranversal, no edition. Creation is the only thing you need when you adhere to the React discipline.

## API

````js
// Creating element
const div = Bouture.div;

// With text
const h1 = Bouture.h1('Best lib of all times');

// Attribute
const input = Bouture.input({type: 'tel'});

// Classes
const multiClassDiv = Bouture.div({class: ['yo', 'ya']})

// Attribute and text
const a = Bouture.a({href: 'https://github.com/DavidBruant/bouture'}, 'bouture.js');

// Nested creation with one child
const table = Bouture.table.tbody.tr;

// Nested creation with children
const ul = Bouture.ul( ['abra', 'kadabra', 'alakazam'].map(Bouture.li) );

// Events
const b1 = Bouture.button({
  onClick: e => console.log('click', e),
  onceMousedown: e => console.log('mousedown', e),
})

// Custom Element
const ce = Bouture('custom-element', Bouture('paper-badge', {label: '3'}))

// append to actual DOM
document.body.append(h1.element);
````
