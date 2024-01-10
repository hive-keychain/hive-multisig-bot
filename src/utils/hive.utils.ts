import { Client } from "@hiveio/dhive";
const signature = require("@hiveio/hive-js/lib/auth/ecc");

let hiveClient: Client;

const getClient = () => {
  if (!hiveClient)
    hiveClient = new Client([
      "https://api.deathwing.me",
      "https://api.hive.blog",
    ]);
  return hiveClient;
};

const signMessage = (message: string, privateKey: string) => {
  let buf;
  try {
    const o = JSON.parse(message, (k, v) => {
      if (
        v !== null &&
        typeof v === "object" &&
        "type" in v &&
        v.type === "Buffer" &&
        "data" in v &&
        Array.isArray(v.data)
      ) {
        return Buffer.from(v.data);
      }
      return v;
    });
    if (Buffer.isBuffer(o)) {
      buf = o;
    } else {
      buf = message;
    }
  } catch (e) {
    buf = message;
  }
  return signature.Signature.signBuffer(buf, privateKey).toHex();
};

export const HiveUtils = {
  getClient,
  signMessage,
};
