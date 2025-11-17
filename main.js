const { HashMap, HashSet } = require('./hashmap');

console.log('=== HashMap test ===');
const test = new HashMap({ capacity: 16, loadFactor: 0.75 });

const seed = [
  ['apple', 'red'],
  ['banana', 'yellow'],
  ['carrot', 'orange'],
  ['dog', 'brown'],
  ['elephant', 'gray'],
  ['frog', 'green'],
  ['grape', 'purple'],
  ['hat', 'black'],
  ['ice cream', 'white'],
  ['jacket', 'blue'],
  ['kite', 'pink'],
  ['lion', 'golden']
];

for (const [k, v] of seed) test.set(k, v);

console.log('length:', test.length());
console.log('capacity:', test.capacity());
console.log('load factor limit:', test.loadFactor());
console.log('current load:', (test.length() / test.capacity()).toFixed(3));

console.log('\nEntries (sample):', test.entries());

// overwrite a few nodes
test.set('apple', 'greenish');
test.set('dog', 'dark brown');
console.log('\nAfter overwrites, length (should be same):', test.length());

// cause growth by adding 'moon'
test.set('moon', 'silver');
console.log('\nAfter adding moon -> length:', test.length());
console.log('New capacity (should be doubled):', test.capacity());
console.log('New load:', (test.length() / test.capacity()).toFixed(3));

// sanity checks
console.log('\nget(kite):', test.get('kite'));
console.log('has(jacket):', test.has('jacket'));
console.log('remove(frog):', test.remove('frog'));
console.log('has(frog):', test.has('frog'));
console.log('keys():', test.keys());
console.log('values():', test.values());
console.log('entries():', test.entries());

// clear
test.clear();
console.log('\nAfter clear length (0):', test.length());

// HashSet demo
console.log('\n=== HashSet demo ===');
const hs = new HashSet({ capacity: 8 });
hs.add('alpha');
hs.add('beta');
hs.add('gamma');
console.log('HashSet has alpha?', hs.has('alpha'));
console.log('HashSet values:', hs.values());
console.log('HashSet size:', hs.size());
hs.remove('beta');
console.log('After remove beta, has beta?', hs.has('beta'));
