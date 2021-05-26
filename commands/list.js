const { default: axios } = require("axios");

module.exports = {
    name: 'list',
    description: 'This shows the list of coins available',
    async execute(message, args)
    {
        let listCoins = async () => {
            let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            return response.data;
        }
        let coinData = await listCoins();
        message.channel.send('**Coin (Symbol)**');
        let text = '';
        for (let i = 0; i < coinData.length; i++)
        {
            text += coinData[i].id + ' (' + coinData[i].symbol + ')\n';
        }
        console.log(text);

        message.channel.send(text);
    }
}