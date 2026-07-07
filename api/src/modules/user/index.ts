import {db} from "@/lib/db";
import {createToken} from "@/lib/security";
import {useRequest} from "@/lib/store";
import {sample} from "lodash-es";

const names = [
  "Swift Fox",
  "Brave Otter",
  "Lucky Panda",
  "Silent Wolf",
  "Happy Koala",
  "Bold Falcon",
  "Cosmic Cat",
  "Jolly Badger",
  "Mighty Moose",
  "Sunny Sparrow",
  "Clever Raccoon",
  "Nimble Lynx",
  "Sneaky Ferret",
  "Golden Hare",
  "Cheerful Robin",
  "Wild Puffin",
];

export async function getAccount({token}: {token: string}) {
  const account = await db<{
    id: string;
    name: string;
    token: string;
  }>("users")
    .where({
      token,
    })
    .first("name", "id");

  if (!account) {
    return null;
  }

  return {
    name: account.name,
    id: account.id,
  };
}

export async function auth({device_id}: {device_id: string}) {
  const {country, city, region, time_zone} = useRequest((store) => {
    return {
      country: store.headers["cloudfront-viewer-country"],
      city: store.headers["cloudfront-viewer-city"],
      region: store.headers["cloudfront-viewer-country-region"],
      time_zone: store.headers["cloudfront-viewer-time-zone"],
    };
  });

  const existing = await db<{
    device_id: string;
    token: string;
  }>("users")
    .where({
      device_id,
    })
    .first("token");

  if (existing) {
    db<{
      token: string;
      authenticated_at: string;
    }>("users")
      .where({
        token: existing.token,
      })
      .update({
        authenticated_at: db.fn.now(),
      });

    return {
      token: existing.token,
    };
  }

  const [created] = await db<{
    id: string;
    name: string;
    device_id: string;
    token: string;
    country: string;
    city: string;
    region: string;
    time_zone: string;
  }>("users")
    .insert({
      token: createToken(),
      name: sample(names),
      device_id,
      country,
      city,
      region,
      time_zone,
    })
    .returning("token");

  return {
    token: created.token,
  };
}
