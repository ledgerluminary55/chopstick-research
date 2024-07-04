import { ApiPromise, WsProvider } from "@polkadot/api";

const WS_PROVIDER = "ws://localhost:8000";
const ACCOUNT_ADDRESS = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty";

async function main() {
  const wsProvider = new WsProvider(WS_PROVIDER);
  const api = await ApiPromise.create({ provider: wsProvider });

  const accountBalance = await api.query.system.account(ACCOUNT_ADDRESS);
  console.log(`Account's balance before: `);
  console.dir(accountBalance.toHuman(), { depth: null });

  await api.rpc("dev_setStorage", {
    system: {
      account: [[[ACCOUNT_ADDRESS], { providers: 1, data: { free: "0" } }]],
    },
  });

  const accountBalanceAfter = await api.query.system.account(ACCOUNT_ADDRESS);
  console.log(`Account's balance after: `);
  console.dir(accountBalanceAfter.toHuman(), { depth: null });
  
  await api.disconnect();
  process.exit(0);
}

try {
  main();
} catch (e) {
  console.log(e);
  process.exit(1);
}
