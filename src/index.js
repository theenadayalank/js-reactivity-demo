class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if(target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

let data = {
  price : 10,
  quantity: 5
}
let total = 0;
let salePrice;
let target;

Object.keys(data).forEach(key => {
  let _value = data[key];
  const dep = new Dep();
  Object.defineProperty(data,key, {
    get() {
      dep.depend();
      return _value;
    },
    set(newValue) {
      _value = newValue;
      dep.notify();
    }
  })
});

function watcher(computedProperty) {
  target = computedProperty;
  target();
  target = null;
}

watcher(() => {
  total = data.price * data.quantity;
});

watcher(() => {
  salePrice = data.price * 0.9;
})