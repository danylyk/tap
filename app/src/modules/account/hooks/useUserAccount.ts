import {useEffect} from "react";

import useAccount from "@/elements/stores/useAccount";

import {getAccount} from "../server";

export function useUserAccount() {
  const token = useAccount((state) => {
    return state.app.token;
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    async function action() {
      const {setAccount, setLoading} = useAccount.getState();

      try {
        const {id, name} = await getAccount({
          token,
        });

        setAccount({
          id,
          name,
        });
      } finally {
        setLoading({
          loading: false,
        });
      }
    }

    action();
  }, [token]);
}
