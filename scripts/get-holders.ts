import axios from 'axios';

// Replace with your BSC API key and the token contract address
const apiKey = 'VAUQEWXYHUST4MTB5KBVFTHGW8W3CD7VIN';
const contractAddress = '0xC58250742514Ee221869b18d86ef2101360Ffd5a';

// Function to fetch the list of token holders
async function getTokenHolders(apiKey: string, contractAddress: string) {
  try {
    // URL for BSC token holders API
    const url = `https://api.bscscan.com/api?module=account&action=tokenholders&contractaddress=0xC58250742514Ee221869b18d86ef2101360Ffd5a&page=1&offset=10000&sort=asc&apikey=VAUQEWXYHUST4MTB5KBVFTHGW8W3CD7VIN`;

    const response = await axios.get(url);

    if (response.data.status === '1') {
      // Extract the list of holders
      const holders = response.data.result.map((tx: any) => tx.from);
      console.log(holders);
    } else {
      console.log('API request failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to get the list of token holders
getTokenHolders(apiKey, contractAddress);