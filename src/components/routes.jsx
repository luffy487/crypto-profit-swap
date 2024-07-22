import React from 'react';

const Routes = ({ routes, toCurrency, fromCurrency }) => {
  const goToDEX = (DEX, input, output) => {
    switch (DEX) {
      case 'Jupitor':
        window.open(`https://jup.ag/swap/${input.address}-${output.address}`, '_blank');
        break;
      case 'Raydium':
        window.open(`https://raydium.io/swap/?inputMint=${input.symbol}&outputMint=${output.address}`, '_blank');
        break;
      case 'Orca':
        window.open(`https://www.orca.so/?tokenIn=${input.address}&tokenOut=${output.address}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {routes.map((route, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg shadow-md text-white flex items-center justify-between min-w-[250px] max-w-[300px]"
        >
          <span className="text-gray-300 text-lg flex-1">
            {route.dexName}{" - "} 
            <span className="text-green-400 font-semibold">
              {route.tokenValue}
            </span>
          </span>
          <button
            onClick={() => goToDEX(route.dexName, fromCurrency, toCurrency)}
            className="bg-gray-600 text-teal-300 hover:bg-gray-500 focus:outline-none text-sm font-medium py-1 px-3 rounded-lg"
          >
            Go
          </button>
        </div>
      ))}
    </div>
  );
};

export default Routes;
