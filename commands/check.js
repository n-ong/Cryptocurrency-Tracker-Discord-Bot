const { default: axios } = require("axios");

module.exports = {
    name: 'check',
    description: 'This shows the current price of BTC/ETH',
    async execute(message, args)
    {
        if (args.length !== 1)
        {
            message.channel.send("Please specify which coin you want to check the price of. !check [btc/eth]");
        }
        else
        {
            /*
            --Sample Output--
            The current price of BTC at [Time] is: $XXXXX
            Today's High: $XXXXX
            Today's Low: $XXXXX
            Hourly % Change:
            Daily % Change: 
            */
            let coinData = async () => {
                let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h');
                return response.data;
            }
            let coinDataArr = await coinData();
            let i = 0;
            for (i; i < coinDataArr.length; i++)
            {
                if (coinDataArr[i].symbol == args[0])
                {
                    let coin = coinDataArr[i];
                    let timeDay = coin.last_updated.substr(0,10);
                    let timeHour = coin.last_updated.substr(11,8);
                    let price = coin.current_price.toLocaleString();
                    let todayHigh = coin.high_24h.toLocaleString();
                    let todayLow = coin.low_24h.toLocaleString();
                    let pctChange1h = coin.price_change_percentage_1h_in_currency.toLocaleString('en-US', {maximumFractionDigits:3});
                    let pctChange24h = coin.price_change_percentage_24h.toLocaleString('en-US', {maximumFractionDigits:3});
                    message.channel.send("The current price of **" + coin.name + "** on " + timeDay + " at " + timeHour + " GMT is: **$" + price + "**\nToday's High: $" + todayHigh + "\nToday's Low: $" + todayLow + "\nHourly % Change: " + pctChange1h + "%\nDaily % Change: " + pctChange24h +"%\n\nPowered by CoinGecko");
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