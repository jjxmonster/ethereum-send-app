let defaultAccounts = ['0x73780a0dF37eBcF54677a72537269B4f145dA436'];
let defaultNetwork = '1HTTP://127.0.0.1:7545';
let accounts = defaultAccounts.slice();
let network = defaultNetwork;

export const web3 = {
   eth: {
      accounts: {
         wallet: {
            length: 0,
         },
      },
      getAccounts: cb => cb(null, accounts),
      net: {
         getId: cb => cb(null, network),
      },
   },
   currentProvider: {
      enable: () => {
         return Promise.resolve(accounts);
      },
   },
   setNetwork: v => (network = v),
   setAccounts: v => {
      accounts = v;
      accounts.forEach((address, i) => {
         web3.eth.accounts.wallet[i] = {
            address: address,
         };
      });
      web3.eth.accounts.wallet.length = accounts.length;
   },
   restore: () => {
      accounts = defaultAccounts.slice();
      network = defaultNetwork;
      web3.eth.accounts.wallet = { length: 0 };
   },
   version: '1.0.0-beta.20',
};
