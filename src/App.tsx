import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Counter from './components/Counter';
import TransactionHistory from './components/TransactionHistory';

const walletAddress = process.env.REACT_APP_WALLETADDRESS;
const sepAPI = process.env.REACT_APP_APISEP;
const ethAPI = process.env.REACT_APP_APIETH;

const providerSep = new ethers.providers.JsonRpcProvider(sepAPI);
const providerEth = new ethers.providers.JsonRpcProvider(ethAPI);

const address = walletAddress;

function App() {
  const [sepBlockCounter, setSepBlockCounter] = useState<number>(0);
  const [ethBlockCounter, setEthBlockCounter] = useState<number>(0);

  const queryBlockchainEth = async () => {
    const block = await providerEth.getBlockNumber();
    setEthBlockCounter(block);
    // console.log(`Current Ethereum Block Number: ${block}`);     
  };

  useEffect(() => {
    queryBlockchainEth(); // Initial query
    const interval = setInterval(() => {
      queryBlockchainEth();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and sets up the interval

  const queryBlockchainSep = async () => {
    const block = await providerSep.getBlockNumber();
    setSepBlockCounter(block);
    // console.log(`Current Sepolia Block Number: ${block}`);     
  };

  useEffect(() => {
    queryBlockchainSep(); // Initial query
    const interval = setInterval(() => {
      queryBlockchainSep();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and sets up the interval

  return (
    <div className="App">
      <span className='heading'>ETHERSCAN</span>
      <div className='container'>
        <div className='subcontainer'>
          <Counter title="Ethereum Mainnet" count={ethBlockCounter} />
          <Counter title="Sepolia" count={sepBlockCounter} />
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
}

export default App;
