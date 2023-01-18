import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    cosmos: {
      authz: {
        v1beta1: (await import("../cosmos/authz/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      bank: {
        v1beta1: (await import("../cosmos/bank/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      distribution: {
        v1beta1: (await import("../cosmos/distribution/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      gov: {
        v1: (await import("../cosmos/gov/v1/query.rpc.query")).createRpcQueryExtension(client),
        v1beta1: (await import("../cosmos/gov/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      staking: {
        v1beta1: (await import("../cosmos/staking/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      tx: {
        v1beta1: (await import("../cosmos/tx/v1beta1/service.rpc.svc")).createRpcQueryExtension(client)
      },
      upgrade: {
        v1beta1: (await import("../cosmos/upgrade/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      }
    },
    seiprotocol: {
      seichain: {
        dex: (await import("./seichain/dex/query.rpc.query")).createRpcQueryExtension(client),
        epoch: (await import("./seichain/epoch/query.rpc.query")).createRpcQueryExtension(client),
        mint: (await import("./seichain/mint/v1beta1/query.rpc.query")).createRpcQueryExtension(client),
        nitro: (await import("./seichain/nitro/query.rpc.query")).createRpcQueryExtension(client),
        oracle: (await import("./seichain/oracle/query.rpc.query")).createRpcQueryExtension(client),
        tokenfactory: (await import("./seichain/tokenfactory/query.rpc.query")).createRpcQueryExtension(client)
      }
    }
  };
};