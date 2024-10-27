import React, { useEffect } from "react";
import { create as createStore } from "zustand";
import { NetworkId } from "@near-wallet-selector/core";

import { Wallet } from "../wallets/near-wallet";

import { GUESTBOOK_CONTRACT } from "../config/contract";
import { NETWORK_ID } from "../config/environment";

interface StoreState {
    wallet: Wallet | undefined;
    signedAccountId: string;
    networkId: NetworkId;
    setNetworkId: (networkId: NetworkId) => void;
    setWallet: (wallet: Wallet) => void;
    setSignedAccountId: (signedAccountId: string | undefined) => void;
}

// Store to share wallet and signed account
export const useWallet = createStore<StoreState>((set) => ({
    wallet: undefined,
    signedAccountId: "",
    networkId: NETWORK_ID,
    setNetworkId: (networkId: NetworkId) => set({ networkId }),
    setWallet: (wallet: Wallet) => set({ wallet }),
    setSignedAccountId: (signedAccountId: string | undefined) => {
        return set({ signedAccountId });
    }
}));

type NearProviderProps = {
    children: React.ReactNode;
};

const getNearContract = (networkId: NetworkId) => GUESTBOOK_CONTRACT[networkId];

export default function NearProvider({ children }: NearProviderProps) {
    const { setWallet, setSignedAccountId, networkId } = useWallet();

    useEffect(() => {
        const wallet = new Wallet({
            createAccessKeyFor: getNearContract(networkId as NetworkId),
            networkId: networkId as NetworkId
        });
        wallet.startUp((accountId: any) => setSignedAccountId(accountId));

        setWallet(wallet);
    }, [networkId]);

    return <>{children}</>;
}