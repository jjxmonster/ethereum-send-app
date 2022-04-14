import Web3 from 'web3';

export const sendEthereum = async (setError: (err: any) => void) => {
   try {
      if (window.ethereum) {
         await window.ethereum.send('eth_requestAccounts');
         const web3 = new Web3(window.ethereum);
         const accounts = await web3.eth.getAccounts();
         const account = accounts[0];
         // web3.eth.sendTransaction({
         //    from: account,
         //    to: '0x1ff4B89B68ACD98B890b9a829948CDc21B2B4634',
         //    value: Web3.utils.toWei('1', 'ether'),
         // });
      } else {
         setError({ message: 'No crypto wallet. Install it' });
      }
   } catch (error) {
      setError(error);
   }
};
