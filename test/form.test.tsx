import * as React from 'react';
import { render, screen, fireEvent } from './test-utils';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Web3 from 'web3';
const Web3PromiEvent = require('web3-core-promievent');

import Form from '../components/Form';
import * as payment from '../assets/payment';
import { successResponse } from '../helpers/transactionResponse.mock';
import { sendEthereum } from '../assets/payment';

const web3Provider = new Web3('HTTP://127.0.0.1:7545');
const recipientAddress = '0xb8Ca9a7495eA9Ee0DB8B93808a285aC1db4Ffc46';

// describe('Form render', () => {
//    beforeEach(() => {
//       render(
//          <Form
//             amount={0}
//             recipientAddress=''
//             setRecipientAddress={() => {}}
//             setAmount={() => {}}
//             provider={web3Provider}
//          />
//       );
//    });

//    it('should be render', () => {
//       expect(screen.getByTestId('input-address')).toBeInTheDocument();
//       expect(screen.getByTestId('input-amount')).toBeInTheDocument();
//       expect(screen.getByTestId('button-send')).toBeInTheDocument();
//    });
//    it('should render error paragraph when user click send button with invalid data', () => {
//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );
//       expect(screen.getByTestId('error-message-paragraph')).toBeInTheDocument();
//    });
// });

// describe('form validation', () => {
//    it('should show address error message when user click send button with invalid address', () => {
//       render(
//          <Form
//             amount={5}
//             recipientAddress='invalid address'
//             setRecipientAddress={() => {}}
//             setAmount={() => {}}
//             provider={web3Provider}
//          />
//       );

//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );

//       expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
//          'Something is wrong with recipient address'
//       );
//    });

//    it('should show amount error message when user click send button with invalid amount', () => {
//       render(
//          <Form
//             amount={0}
//             recipientAddress=''
//             setRecipientAddress={() => {}}
//             setAmount={() => {}}
//             provider={web3Provider}
//          />
//       );

//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );

//       expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
//          'Amount have to be greater than zero'
//       );
//    });
//    it('should call sendEthereum function if user pass valid data', () => {
//       render(
//          <Form
//             amount={5}
//             recipientAddress={recipientAddress}
//             setRecipientAddress={() => {}}
//             setAmount={() => {}}
//             provider={web3Provider}
//          />
//       );

//       const sendEthereum = jest.spyOn(payment, 'sendEthereum');

//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );
//       expect(sendEthereum).toHaveBeenCalled();
//    });
// });

// describe('sendEthereum function before connect wallet', () => {
//    beforeEach(() => {
//       render(
//          <Form
//             amount={5}
//             recipientAddress={recipientAddress}
//             setRecipientAddress={() => {}}
//             setAmount={() => {}}
//             provider={web3Provider}
//          />
//       );
//    });
//    it('should return error when user dont have wallet installed', () => {
//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );
//       // default in test window.ethereum is undefined
//       expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
//          'No crypto wallet. Install it'
//       );
//    });
//    it('should ask user to connect wallet if is installed', () => {
//       delete window.ethereum;
//       window.ethereum = {};
//       window.ethereum.send = jest.fn();

//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );

//       expect(window.ethereum.send).toHaveBeenCalled();
//    });
//    it('should return error if user reject wallet connection', async () => {
//       delete window.ethereum;
//       window.ethereum = {};
//       window.ethereum.send = jest.fn();

//       jest
//          .spyOn(window.ethereum, 'send')
//          .mockImplementation(() => Promise.reject());

//       fireEvent(
//          screen.getByTestId('button-send'),
//          new MouseEvent('click', {
//             bubbles: true,
//             cancelable: true,
//          })
//       );
//       const errorParagraph = await waitFor(() =>
//          screen.getByTestId('error-message-paragraph')
//       );
//       expect(errorParagraph).toHaveTextContent('User rejected the request');
//    });
// });

describe('sendEthereum funtion after wallet connect', () => {
   it('should start perform the transaction if user connect wallet', async () => {
      // prepare window.ethereum
      delete window.ethereum;
      window.ethereum = {};
      window.ethereum.send = jest.fn();

      const pe = new Web3PromiEvent();
      const web3 = new Web3(window.ethereum);
      let defaultAccounts = ['0x76a491a5bdF1ce523B1a45a173d38A80eFF88aA2'];

      render(
         <Form
            amount={5}
            recipientAddress={recipientAddress}
            setRecipientAddress={() => {}}
            setAmount={() => {}}
            provider={web3}
         />
      );

      // spyOn
      const requestAccount = jest
         .spyOn(window.ethereum, 'send')
         .mockImplementation(() => Promise.resolve());
      const getAccounts = jest
         .spyOn(web3.eth, 'getAccounts')
         .mockImplementation(() => Promise.resolve(defaultAccounts));
      const sendTransaction = jest
         .spyOn(web3.eth, 'sendTransaction')
         .mockImplementationOnce(() => {
            console.log('called');
            pe.eventEmitter.emit('sent', successResponse);
            pe.resolve('sent');

            return pe;
         });

      jest.spyOn(payment, 'sendEthereum');

      sendEthereum(() => {}, recipientAddress, 5, web3).then(() => {
         expect(requestAccount).toHaveBeenCalledWith('eth_requestAccounts');
         expect(getAccounts).toHaveBeenCalled();
         expect(sendTransaction).toHaveBeenCalledWith({
            from: defaultAccounts[0],
            to: recipientAddress,
            value: Web3.utils.toWei('5', 'ether'),
         });
      });
   });
});
