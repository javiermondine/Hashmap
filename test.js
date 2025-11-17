const assert = require('assert');
const { HashMap, HashSet } = require('./hashmap');

function runHashMapTests() {
  const map = new HashMap({ capacity: 16, loadFactor: 0.75 });

  // seed
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

  seed.forEach(([k, v]) => map.set(k, v));

  assert.strictEqual(map.length(), 12, 'length after seed should be 12');
  assert.strictEqual(map.capacity(), 16, 'capacity should be 16');
  assert.ok(map.has('apple'));
  assert.strictEqual(map.get('apple'), 'red');

  // overwrite
  map.set('apple', 'greenish');
  assert.strictEqual(map.get('apple'), 'greenish');
  assert.strictEqual(map.length(), 12);

  // trigger resize
  map.set('moon', 'silver');
  assert.strictEqual(map.length(), 13);
  assert.strictEqual(map.capacity(), 32);

  // remove
  assert.ok(map.remove('frog'));
  assert.strictEqual(map.has('frog'), false);

  // keys/values/entries
  const keys = map.keys();
  const values = map.values();
  const entries = map.entries();
  assert.ok(Array.isArray(keys) && keys.length === map.length());
  assert.ok(Array.isArray(values) && values.length === map.length());
  assert.ok(Array.isArray(entries) && entries.length === map.length());

  // clear
  map.clear();
  assert.strictEqual(map.length(), 0);

  console.log('HashMap tests passed ✅');
}

function runHashSetTests() {
  const hs = new HashSet({ capacity: 8 });
  hs.add('a');
  hs.add('b');
  hs.add('c');
  assert.ok(hs.has('a'));
  assert.strictEqual(hs.size(), 3);
  hs.remove('b');
  assert.strictEqual(hs.has('b'), false);
  console.log('HashSet tests passed ✅');
}

try {
  runHashMapTests();
  runHashSetTests();
  console.log('\nAll tests passed');
  process.exit(0);
} catch (err) {
  console.error('Test failure:', err.message);
  console.error(err.stack);
  process.exit(1);
}
