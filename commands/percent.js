const { default: axios } = require("axios");

module.exports = {
    name: 'percent',
    description: 'This shows the percent changes for a coin (hourly, daily, weekly, monthly, annual).',
    async execute(message, args)
    {
        if (args.length !== 1)
        {
            message.channel.send("Please specify which coin you want to check the price of. !check [btc/eth]");
        }
        else
        {
            let coinData = async () => {
                let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y');
                return response.data;
            }
            let coinDataArr = await coinData();
            let i = 0;
            for (i; i < coinDataArr.length; i++)
            {
                if (coinDataArr[i].symbol == args[0])
                {
                    let coin = coinDataArr[i];
                    let pctChange1h = coin.price_change_percentage_1h_in_currency.toLocaleString('en-US', {maximumFractionDigits:3});
                    let pctChange24h = coin.price_change_percentage_24h_in_currency.toLocaleString('en-US', {maximumFractionDigits:3});
                    let pctChange7d = coin.price_change_percentage_7d_in_currency.toLocaleString('en-US', {maximumFractionDigits:3});
                    let pctChange30d = coin.price_change_percentage_30d_in_currency.toLocaleString('en-US', {maximumFractionDigits:3});
                    let pctChange1y = coin.price_change_percentage_1y_in_currency.toLocaleString('en-US', {maximumFractionDigits:3});
                    message.channel.send("**Percent Data for " + coin.name + "**\nHourly Percent Change: " + pctChange1h + "%\nDaily Percent Change: " + pctChange24h + "%\nWeekly Percent Change: " + pctChange7d + "%\nMonthly Percent Change: " + pctChange30d + "%\nAnnual Percent Change: " + pctChange1y + "%\n\nPowered by CoinGecko");
                    break;
                }
            }
            if (i == coinDataArr.length)
            {
                message.channel.send("Coin could not be found. Please refer to !list for a list of valid coin symbols. Command format: !check 'symbol'")
            }
        }
    }
}