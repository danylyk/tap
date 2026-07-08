import {z} from "zod";

import {backend} from "@/lib/api";

const Session = z.object({
  token: z.string(),
});

const Account = z.object({
  id: z.string(),
  name: z.string(),
});

export async function createAccount() {
  const session = Session.parse(
    await backend.post({
      path: "v1/create-account",
    }),
  );

  return {
    token: session.token,
  };
}

export async function getAccount({token}: {token: string}) {
  const account = Account.parse(
    await backend.get({
      path: "v1/get-account",
      token,
    }),
  );

  return {
    id: account.id,
    name: account.name,
  };
}
