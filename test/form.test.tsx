import { render, screen, fireEvent } from './text-utils';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import Form from '../components/Form';
import * as payment from '../assets/payment';

describe('Form render', () => {
   beforeEach(() => {
      render(
         <Form
            amount={0}
            recipientAddress=''
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );
   });

   it('should be render', () => {
      expect(screen.getByTestId('input-address')).toBeInTheDocument();
      expect(screen.getByTestId('input-amount')).toBeInTheDocument();
      expect(screen.getByTestId('button-send')).toBeInTheDocument();
   });
   it('should render error paragraph when user click send button with invalid data', () => {
      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );
      expect(screen.getByTestId('error-message-paragraph')).toBeInTheDocument();
   });
});

describe('form validation', () => {
   it('should show address error message when user click send button with invalid address', () => {
      render(
         <Form
            amount={5}
            recipientAddress='invalid address'
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );

      expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
         'Something is wrong with recipient address'
      );
   });

   it('should show amount error message when user click send button with invalid amount', () => {
      render(
         <Form
            amount={0}
            recipientAddress=''
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );

      expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
         'Amount have to be greater than zero'
      );
   });
   it('should call sendEthereum function if user pass valid data', () => {
      render(
         <Form
            amount={5}
            recipientAddress='0x6922d24fa3Ea25C78f721C3B7678a5aF00db219F'
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );

      const sendEthereum = jest.spyOn(payment, 'sendEthereum');

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );
      expect(sendEthereum).toHaveBeenCalled();
   });
});

describe('sendEthereum function', () => {
   beforeEach(() => {
      render(
         <Form
            amount={5}
            recipientAddress='0x6922d24fa3Ea25C78f721C3B7678a5aF00db219F'
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );
   });
   it('should return error when user dont have wallet installed', () => {
      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );
      // default in test window.ethereum is undefined
      expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
         'No crypto wallet. Install it'
      );
   });
   it('should ask user to connect wallet if is installed', () => {
      delete window.ethereum;
      window.ethereum = {};
      window.ethereum.send = jest.fn();

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );

      expect(window.ethereum.send).toHaveBeenCalled();
   });
   it('should return error if user reject wallet connection', async () => {
      delete window.ethereum;
      window.ethereum = {};
      window.ethereum.send = jest.fn();

      jest
         .spyOn(window.ethereum, 'send')
         .mockImplementation(() => Promise.reject());

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );
      const errorParagraph = await waitFor(() =>
         screen.getByTestId('error-message-paragraph')
      );
      expect(errorParagraph).toHaveTextContent('User rejected the request');
   });
});
