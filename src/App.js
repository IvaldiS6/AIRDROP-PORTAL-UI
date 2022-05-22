import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import NumericInput from 'react-numeric-input';


// Constants
const TWITTER_HANDLE = 'ItsWilliam77';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TWITTER_HANDLE2 = 'SecurePy';
const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with Public Key:', response.publicKey.toString()
          );


          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };



  
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );


  const renderConnectedContainer = () => (
<div>
<div className='walletAddress'><p>Connected Wallet: {walletAddress}</p></div>
</div>
  );

  const renderConnectedContainer2 = () => (
    <div className='formSection'>
      <form>
<h1>Enter your information below:</h1>
        <p>Do you want to send tokens to one or multiple wallets?</p>
          <select>
            <option value="grapefruit">One</option>
            <option value="lime">Many</option>
            </select>
            <div>
            <p>What is the address of the token you want to send?</p>
            <textarea></textarea>
            <p>How many tokens to you want to send to each participant?</p>
            <NumericInput min={0} max={100} value={1}/>
            <p>Upload a CSV file containing the address you want to send to.</p>
            <input type="file" />
            <div className='submitButton'>
          </div>
</div>
        </form>
    </div>
      );

      const renderConnectedContainer3 = () => (
        <div className='submitButton'>
      <button type="submit">Send Tokens</button>
      </div>
          );


  


  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (



    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🪂 Solana Airdrop Tool</p>
          <p className="sub-text">
            Aidrop Solana or SPL tokens to one or multiple solana addresses.
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {/* We just need to add the inverse here! */}
          {walletAddress && renderConnectedContainer()}
          {walletAddress && renderConnectedContainer2()}
          {walletAddress && renderConnectedContainer3()}
        </div>



        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >{`@${TWITTER_HANDLE}`}</a>
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
                    <a
            className="footer-text"
            href={TWITTER_LINK2}
            target="_blank"
            rel="noopener noreferrer"
          >{`@${TWITTER_HANDLE2}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;