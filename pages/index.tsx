import React, { useState } from 'react';
import type { NextPage } from 'next';
import Web3 from 'web3';

import Form from '../components/Form';
import Head from 'next/head';

import { sendEthereum } from '../assets/payment';

export type MessageState = {
   code?: number;
   message?: string;
   stack?: string;
   error: boolean;
};

const Home: NextPage = () => {
   const [recipientAddress, setRecipientAddress] = useState<string>('');
   const [amount, setAmount] = useState<number>(0);

   // const handleSendEthereum = (): void => {
   //    if (amount > 0) {
   //       if (Web3.utils.isAddress(recipientAddress)) {
   //          setMessage({ message: '', error: false });
   //          sendEthereum(setMessage, recipientAddress, amount);
   //       } else {
   //          setMessage({
   //             message: 'Something is wrong with recipient address',
   //             error: true,
   //          });
   //       }
   //    } else {
   //       setMessage({
   //          message: 'Amount have to be greater than zero',
   //          error: true,
   //       });
   //    }
   // };

   return (
      <>
         <Head>
            <title>Ethereum payment</title>
         </Head>
         <div className='w-screen h-screen flex items-center justify-center bg-blue-700 flex-col'>
            <div className='w-full max-w-md'>
               <Form
                  amount={amount}
                  recipientAddress={recipientAddress}
                  setRecipientAddress={setRecipientAddress}
                  setAmount={setAmount}
               />
            </div>
         </div>
      </>
   );
};

export default Home;
