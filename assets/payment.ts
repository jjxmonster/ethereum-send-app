import Web3 from 'web3';

export const sendEthereum = async (
   setError: (err: any) => void,
   address: string,
   amount: number
) => {
   try {
      if (window.ethereum) {
         // login with metamask wallet
         await window.ethereum.send('eth_requestAccounts');
         const web3 = new Web3(window.ethereum);
         const accounts = await web3.eth.getAccounts();
         const account = accounts[0];
         // if user has logged in, perform the transaction
         web3.eth.sendTransaction({
            from: account,
            to: address,
            value: Web3.utils.toWei(amount.toString(), 'ether'),
         });
      } else {
         setError({ message: 'No crypto wallet. Install it' });
      }
   } catch (error) {
      setError(error);
   }
};
