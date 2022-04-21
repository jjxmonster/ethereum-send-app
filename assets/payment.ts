import Web3 from 'web3';

export const sendEthereum = async (
   setMessage: (err: any) => void,
   address: string,
   amount: number,
   web3: Web3
) => {
   try {
      if (window.ethereum) {
         // login with metamask wallet
         await window.ethereum.send('eth_requestAccounts');
         const accounts = await web3.eth.getAccounts();
         const account = accounts[0];

         await web3.eth
            .sendTransaction({
               from: account,
               to: address,
               value: Web3.utils.toWei(amount.toString(), 'ether'),
            })
            .on('sent', console.log);
      } else {
         setMessage({ message: 'No crypto wallet. Install it', error: true });
      }
   } catch (err) {
      setMessage({ message: 'User rejected the request', error: true });
   }
};
