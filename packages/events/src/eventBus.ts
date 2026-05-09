type Handler<T> = (payload: T) => void;

export class EventBus {
  private listeners = new Map<string, Handler<any>[]>();

  on<T>(event: string, handler: Handler<T>) {
    const list = this.listeners.get(event) || [];
    list.push(handler);
    this.listeners.set(event, list);
  }

  emit<T>(event: string, payload: T) {
    const list = this.listeners.get(event) || [];
    list.forEach(fn => fn(payload));
  }
}

export const eventBus = new EventBus();