import {ElectionData} from './loadElections.js';

let x;
// Default would contain all the necessary functions for interaction
export var Default = {
  loading: false,
  contracts: {},

  // Main function to be called first
  load: async () => {
    await Default.loadWeb3();
    await Default.loadAccount(); 
    await Default.loadMainContract();
    await ElectionData.get();
    await Default.render();
  },

  // Loading web3 on the browser
  async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        Default.web3Provider = window.web3.currentProvider;
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
},

  // This function would load account from Metamask to our dDefault
  async loadAccount() {
    const web3 = window.web3;
    await web3.eth.getAccounts().then((result)=>{
      console.log(result[0]);
      Default.account = result[0];
      x = result[0];
    });
   // const acc = '0x643d8A451f891aEDb4613fb5341640E36682dEaa';
   // Default.account = acc;
    console.log({ account: x });},

  // This function would help in loading contract to Default.MainContract
  loadMainContract: async () => {
    // Static pre-deployed contracts should be handled like this
    const MainContract = await $.getJSON('/mainContractJSON');
    console.log(MainContract);
    Default.contracts.MainContract = TruffleContract(MainContract);
    Default.contracts.MainContract.setProvider(Default.web3Provider);
    Default.MainContract = await Default.contracts.MainContract.deployed();
  },

  // This function will be called after the browser is ready for blockchain interaction
  render: async() => {
    if(Default.loading) {
      return;
    }
    Default.setLoading(true);
    $('#account').html(Default.account);
    Default.setLoading(false);
  },

  // This will facilitate loading feature according to the blockchain data
  setLoading: (boolean) => {
    Default.loading = boolean;
    const loader = $('#loader');
    const content = $('#content');
    if(boolean) {
      loader.show();
      content.hide();
    }else {
      loader.hide();
      content.show();
    }
  }
};

// Function to initiate the blockchain interaction
$(() => {
  window.addEventListener('load', ()=>{
      Default.load();
  });
});

window.Default = Default;