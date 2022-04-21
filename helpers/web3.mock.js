let mockWeb3EthContract = function () {};
function __setMockContract(mock) {
   mockWeb3EthContract = mock;
}

let blockNumber = 0;
function __setBlockNumber(number) {
   blockNumber = number;
}
var eth = {
   Contract: jest.fn().mockImplementation(() => mockWeb3EthContract),
   getBlockNumber: () => blockNumber,
};

var web3 = function (provider) {
   return {
      provider: provider,
      eth: eth,
   };
};

web3.providers = {
   HttpProvider: function () {
      return {
         send: (payload, cb) => {
            cb(null, '{}');
         },
      };
   },
};
web3.__setMockContract = __setMockContract;
web3.__setBlockNumber = __setBlockNumber;
module.exports = web3;
