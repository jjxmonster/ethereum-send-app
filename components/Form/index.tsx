import React, { useState, FunctionComponent } from 'react';
import Web3 from 'web3';
import type { NextPage } from 'next';

import { sendEthereum } from '../../assets/payment';

type MessageState = {
   code?: number;
   message?: string;
   stack?: string;
   error: boolean;
};

const Form: FunctionComponent = () => {
   const [message, setMessage] = useState<MessageState>();
   const [recipientAddress, setRecipientAddress] = useState<string>('');
   const [amount, setAmount] = useState<number>(0);

   const handleSendEthereum = (): void => {
      if (amount > 0) {
         if (Web3.utils.isAddress(recipientAddress)) {
            setMessage({ message: '', error: false });
            sendEthereum(setMessage, recipientAddress, amount);
         } else {
            setMessage({
               message: 'Something is wrong with recipient address',
               error: true,
            });
         }
      } else {
         setMessage({
            message: 'Amount have to be greater than zero',
            error: true,
         });
      }
   };
   return (
      <form className='bg-white shadow-md rounded px-5 pt-8 pb-10 mb-4'>
         <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
               Recipient Address
            </label>
            <input
               onChange={e => setRecipientAddress(e.target.value)}
               className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='address'
               type='text'
               placeholder='Address'
            />
         </div>
         <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
               Ethereum Amount
            </label>
            <input
               onChange={e => setAmount(Number(e.target.value))}
               className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
               id='amount'
               type='number'
               placeholder='Amount'
            />
            {message?.message && (
               <p
                  className={`text-xs italic ${
                     message.error ? 'text-red-500' : 'text-green-500'
                  }`}
               >
                  {message.message}
               </p>
            )}
         </div>
         <div className='flex items-center justify-between'>
            <button
               onClick={handleSendEthereum}
               className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
               type='button'
            >
               Send
            </button>
         </div>
      </form>
   );
};

export default Form;
