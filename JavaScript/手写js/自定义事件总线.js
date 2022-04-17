class HYEventBus {
  constructor() {
    this.eventBus = {};
  }
  on(eventName, eventCallback, thisArg) {
    let handler = this.eventBus[eventName];
    if (!handler) {
      handler = [];
      this.eventBus[eventName] = handler;
    }
    handler.push({
      eventCallback,
      thisArg,
    });
  }
  emit(eventName, ...playload) {
    let handler = this.eventBus[eventName];
    if (!handler) return;
    handler.forEach((eventCallback) => {
      eventCallback.apply(thisArg, playload);
    });
  }
  off(eventName, eventCallback) {
    let handler = this.eventBus[eventName];
    if (!handler) return;
    let newHandler = [...handler];
    for (callback of newHandler) {
      if (callback === eventCallback) {
        let index = newHandler.indexOf(callback);
        handler.splice(index, 1);
      }
    }
  }
}
