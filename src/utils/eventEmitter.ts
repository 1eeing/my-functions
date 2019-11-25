interface EventsMap {
  [key: string]: (args: any) => any
}

class EventEmitter {
  private eventsMap: EventsMap = {}

  constructor() {
    this.eventsMap = {};
  }

  public on(eventName: string, fn: Function): void {
    this.eventsMap[eventName] = fn.bind(fn); // 绑定自身this
  }

  public off(eventName: string): void {
    if (this.eventsMap[eventName]) {
      delete this.eventsMap[eventName];
    }
  }

  public emit(eventName: string, ...args: any): any {
    const _fn = this.eventsMap[eventName];
    if (_fn) {
      return _fn(args);
    }
  }
}
