class HashMap {
  constructor({ capacity = 16, loadFactor = 0.75 } = {}) {
    this._capacity = capacity;
    this._loadFactor = loadFactor;
    this._size = 0;
    this._buckets = Array.from({ length: this._capacity }, () => []);
  }

  // Hash function that keeps modulo inside loop to avoid overflow
  _hash(key) {
    if (typeof key !== 'string') throw new TypeError('Keys must be strings');
    let hashCode = 0;
    const prime = 31;
    const mod = this._capacity; // reduce during loop to keep numbers small
    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % mod;
    }
    // hashCode is already in 0..mod-1
    return Math.abs(hashCode) % this._capacity;
  }

  _ensureCapacity() {
    if (this._size / this._capacity <= this._loadFactor) return;
    // grow
    const oldBuckets = this._buckets;
    this._capacity *= 2;
    this._buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // update
        return;
      }
    }
    bucket.push([key, value]);
    this._size++;
    this._ensureCapacity();
  }

  get(key) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this._size;
  }

  clear() {
    this._buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
  }

  keys() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const [k] of bucket) out.push(k);
    }
    return out;
  }

  values() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const [, v] of bucket) out.push(v);
    }
    return out;
  }

  entries() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const [k, v] of bucket) out.push([k, v]);
    }
    return out;
  }

  // expose capacity and loadFactor for testing/inspection
  capacity() {
    return this._capacity;
  }

  loadFactor() {
    return this._loadFactor;
  }
}

// Extra credit: simple HashSet implemented using HashMap semantics
class HashSet {
  constructor(options = {}) {
    this._map = new HashMap(options);
  }

  add(key) {
    this._map.set(key, true);
  }

  has(key) {
    return this._map.has(key);
  }

  remove(key) {
    return this._map.remove(key);
  }

  clear() {
    this._map.clear();
  }

  size() {
    return this._map.length();
  }

  values() {
    return this._map.keys();
  }
}

module.exports = { HashMap, HashSet };
