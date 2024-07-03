import { ApiPromise, WsProvider } from '@polkadot/api';

const WS_PROVIDER = 'ws://localhost:8000';
const ALICE_ADDRESS = '15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5'

async function main() {
  const wsProvider = new WsProvider(WS_PROVIDER);
  const api = await ApiPromise.create({ provider: wsProvider });

  const tx = api.tx.system.remark('Hi Chopstick!');
  console.log(`Sending remark tx hex: ${tx.toHex()}`);

  const result = await api.rpc("dev_setStorage", [[
    ALICE_ADDRESS,
    tx.toHex()
  ]]);

  console.log(`Result: ${result}`);
}

try {
  main();
} catch (e) {
  console.log(e);
  process.exit(1);
}