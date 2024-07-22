const postAPICall = async (url) => {
  let response = await fetch(url);
  const json = await response.json();
  return json;
};

const fetchTokensList = async () => {
  return await postAPICall("https://tokens.jup.ag/tokens?tags=lst,community");
};
const getDecimals = (decimals) => {
  return Math.pow(10, decimals);
};
const calculateTokenValue = (data, token) => {
  if (data?.outAmount) {
    return data.outAmount / getDecimals(token.decimals);
  } else if (data?.data?.outputAmount) {
    return data.data.outputAmount / getDecimals(token.decimals);
  }
  return 0;
};
export { postAPICall, fetchTokensList, getDecimals, calculateTokenValue };
