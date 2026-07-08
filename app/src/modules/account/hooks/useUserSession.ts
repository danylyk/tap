import {useEffect} from "react";

import useAccount, {waitAccountStore} from "@/elements/stores/useAccount";

import {createAccount} from "../server";

export function useUserSession() {
  useEffect(() => {
    async function action() {
      await waitAccountStore;

      const {app} = useAccount.getState();

      if (app.token) {
        return;
      }

      const account = await createAccount();

      const {setToken} = useAccount.getState();

      setToken({
        token: account.token,
      });
    }

    action();
  }, []);
}
