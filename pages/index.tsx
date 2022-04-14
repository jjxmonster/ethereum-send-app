import React, { useState } from 'react';
import Web3 from 'web3';
import type { NextPage } from 'next';

import { sendEthereum } from '../assets/payment';

type ErrorState = {
   code?: number;
   message?: string;
   stack?: string;
};

const Home: NextPage = () => {
   const [error, setError] = useState<ErrorState>();
   const [recipientAddress, setRecipientAddress] = useState<string>('');
   const [amount, setAmount] = useState<number>(0);

   const handleSendEthereum = (): void => {
      if (Web3.utils.isAddress(recipientAddress)) {
         //  sendEthereum(setError, recipientAddress, amount);
      } else {
         setError({ message: 'Something is wrong with recipient address' });
      }
   };

   return (
      <div className='w-screen h-screen flex items-center justify-center bg-blue-700 flex-col'>
         <h1 className='text-white'>SEND ETHEREUM</h1>
         <div className='h-96 w-96 bg-blue-700 bg-white'>
            <button
               onClick={handleSendEthereum}
               className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
            >
               send
            </button>
            {error?.message}
         </div>
      </div>
   );
};

export default Home;
