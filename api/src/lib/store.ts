import {AsyncLocalStorage} from "node:async_hooks";

interface IStore {
  headers: Record<string, string>;
  token: string;
}

const storage = new AsyncLocalStorage<IStore>();

export function createStore(store: IStore, callback: () => void) {
  storage.run(store, callback);
}

export function useRequest<T>(selector: (store: IStore) => T) {
  const store = storage.getStore();

  if (!store) {
    throw new Error("No event context found.");
  }

  return selector(store);
}

export function setRequest(values: Partial<IStore>) {
  const store = storage.getStore();

  if (!store) {
    throw new Error("No event context found.");
  }

  Object.assign(store, values);
}
