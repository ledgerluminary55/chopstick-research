import { ApiPromise, WsProvider } from '@polkadot/api';

const WS_PROVIDER = 'ws://localhost:8000';
async function main() {
  const wsProvider = new WsProvider(WS_PROVIDER);
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.rpc('dev_newBlock',{ count:1 })
  await api.disconnect();
  process.exit(0);
}

try {
  main();
} catch (e) {
  console.log(e);
  process.exit(1);
}