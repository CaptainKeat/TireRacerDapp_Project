import React, { createContext, useContext, useState } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const connection = new Connection(clusterApiUrl('devnet'));

  const connectWallet = async () => {
    const provider = new PhantomWalletAdapter();
    await provider.connect();
    const address = provider.publicKey.toString();
    setWalletAddress(address);
    console.log('Connected wallet:', address);
  };

  const disconnectWallet = async () => {
    const provider = new PhantomWalletAdapter();
    await provider.disconnect();
    setWalletAddress(null);
    console.log('Disconnected wallet');
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
