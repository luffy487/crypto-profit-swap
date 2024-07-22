import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { fetchTokensList, getDecimals, calculateTokenValue } from "../utils/helper";
import DEXs from "../utils/platforms";
import SkeletonLoading from "./skeletonLoader";
import Routes from "./routes";

const toToken = {
  symbol: "USDC",
  name: "USD Coin",
};
const fromToken = {
  symbol: "ETH",
  name: "Ether (Portal)",
};

const SwapForm = () => {
  const [toAmount, setToAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState();
  const [toCurrencyName, setToCurrencyName] = useState(toToken.name);

  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState();
  const [fromCurrencyName, setFromCurrencyName] = useState(fromToken.name);

  const [tokensList, setTokensList] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [mainLoading, setMainLoading] = useState(true);
  const [generatingLoading, setGeneratingLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      setMainLoading(true);
      let tokens = await fetchTokensList();
      setTokensList(tokens);
      tokens.forEach((tk) => {
        if (tk.symbol === fromToken.symbol) {
          setFromCurrency(tk);
        } else if (tk.symbol === toToken.symbol) {
          setToCurrency(tk);
        }
      });
      setMainLoading(false);
    };
    fetchTokens();
  }, []);

  const onSubmit = async () => {
    setGeneratingLoading(true);
    let prices = await Promise.all(
      DEXs.map(async (dex) => {
        if (dex?.swap) {
          let price = await dex.swap(
            fromCurrency.address,
            toCurrency.address,
            fromAmount * getDecimals(fromCurrency.decimals)
          );
          return {
            ...price,
            tokenValue: calculateTokenValue(price, toCurrency),
            dexName: dex.name,
            goToLink: dex.goToLink,
          };
        }
        return null;
      })
    );
    prices = prices.filter((e) => e).sort((a, b) => b.tokenValue - a.tokenValue);
    setToAmount(prices[0].tokenValue);
    setRoutes(prices);
    setGeneratingLoading(false);
  };

  const onSwap = () => {
    setFromAmount(0);
    let newFromCurrency = toCurrency;
    let newFromCurrencyName = toCurrencyName;
    setToCurrency(fromCurrency);
    setToCurrencyName(fromCurrencyName);
    setFromCurrency(newFromCurrency);
    setFromCurrencyName(newFromCurrencyName);
  };

  const onFromCurrencyChange = (event) => {
    let token = tokensList.find((tk) => tk.name === event.target.value);
    setFromCurrency(token);
    setFromCurrencyName(token.name);
  };

  const onToCurrencyChange = (event) => {
    let token = tokensList.find((tk) => tk.name === event.target.value);
    setToCurrency(token);
    setToCurrencyName(token.name);
  };

  if (mainLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="relative w-screen h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <img
        src={fromCurrency.logoURI}
        alt="Left"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-10"
        style={{ width: "500px", height: "500px" }}
      />

      <div className="relative max-w-md bg-gray-900 shadow-lg rounded-lg p-4 mx-4 mb-6">
        {/* Centering the heading */}
        <h1 className="text-2xl font-bold mb-4 text-center">Crypto Profit</h1>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">From</label>
          <div className="flex items-center space-x-3">
            <select
              className="block w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={onFromCurrencyChange}
              value={fromCurrencyName}
            >
              {tokensList.map((token, i) => (
                <option value={token.name} key={i + "_" + token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="block w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={fromAmount}
              onChange={(event) => setFromAmount(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            className="w-12 h-12 bg-black text-white font-semibold rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            onClick={onSwap}
            aria-label="Swap"
          >
            <FaExchangeAlt className="mx-auto" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">To</label>
          <div className="flex items-center space-x-3">
            <select
              className="block w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={toCurrencyName}
              onChange={onToCurrencyChange}
            >
              {tokensList.map((token, i) => (
                <option value={token.name} key={i + "_" + token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="block w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={toAmount}
              readOnly
            />
          </div>
        </div>

        <button
          className={`w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${Number(fromAmount) <= 0 || generatingLoading ? 'bg-gray-600 cursor-not-allowed' : ''}`}
          onClick={onSubmit}
          disabled={Number(fromAmount) <= 0 || generatingLoading}
        >
          {generatingLoading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {routes.length > 0 && (
        <div className="w-full px-4 mb-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Routes
              routes={routes}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
            />
          </div>
        </div>
      )}

      <img
        src={toCurrency.logoURI}
        alt="Right"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-10"
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  );
};

export default SwapForm;
