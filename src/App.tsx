import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Counter from './components/Counter';
import TransactionHistory from './components/TransactionHistory';

const walletAddress = process.env.REACT_APP_WALLETADDRESS;

const sepAPI = process.env.REACT_APP_APISEP;
const ethAPI = process.env.REACT_APP_APIETH;
const polyAPI = process.env.REACT_APP_APIPOLY;

const providerSep = new ethers.providers.JsonRpcProvider(sepAPI);
const providerEth = new ethers.providers.JsonRpcProvider(ethAPI);
const providerPoly = new ethers.providers.JsonRpcProvider(polyAPI);

const address = walletAddress;

function App() {

  useEffect(() => {
    document.title = "sasta-Etherscan"; 
    return () => {
      document.title = "sasta-Etherscan"; 
    };
  }, []);

  const [sepBlockCounter, setSepBlockCounter] = useState<number>(0);
  const [ethBlockCounter, setEthBlockCounter] = useState<number>(0);
  const [polyBlockCounter, setPolyBlockCounter] = useState<number>(0);

  const queryBlockchainEth = async () => {
    const block = await providerEth.getBlockNumber();
    setEthBlockCounter(block);
  };
  const queryBlockchainSep = async () => {
    const block = await providerSep.getBlockNumber();
    setSepBlockCounter(block);
  };
  const queryBlockchainPoly = async () => {
    const block = await providerPoly.getBlockNumber();
    setPolyBlockCounter(block);
  };



  useEffect(() => {
    queryBlockchainEth();
    queryBlockchainSep();
    queryBlockchainPoly();
    const interval = setInterval(() => {
      queryBlockchainEth();
      queryBlockchainSep();
      queryBlockchainPoly();
    }, 10000);

    return () => clearInterval(interval); 
  }, []);




  return (
    <div className="App">
      <span className='heading'>sasta-ETHERSCAN</span>
      <div className='container'>
        <div className='subcontainer'>
          <Counter title="Ethereum Mainnet" count={ethBlockCounter} />
          <Counter title="Sepolia" count={sepBlockCounter} />
          <Counter title="Polygon zkEVM" count={polyBlockCounter} />
        </div>
        <TransactionHistory providerSep={providerSep}/>
      </div>
    </div>
  );
}

export default App;
