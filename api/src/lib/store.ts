import {AsyncLocalStorage} from "node:async_hooks";

interface IStore {
  headers: Record<string, string>;
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
