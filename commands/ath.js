const { default: axios } = require("axios");

module.exports = {
    name: 'ath',
    description: 'This shows the all time high price and date of a coin.',
    async execute(message, args)
    {
        if (args.length !== 1)
        {
            message.channel.send("Please specify which coin you want to check the price of. !check [btc/eth]");
        }
        else
        {
            let coinData = async () => {
                let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
                return response.data;
            }
            let coinDataArr = await coinData();
            let i = 0;
            for (i; i < coinDataArr.length; i++)
            {
                if (coinDataArr[i].symbol == args[0])
                {
                    let coin = coinDataArr[i];
                    let athDay = coin.ath_date.substr(0,10);
                    let athHour = coin.ath_date.substr(11,8);
                    let athPrice = coin.ath.toLocaleString();
                    let athPctChange = coin.ath_change_percentage.toLocaleString('en-US', {maximumFractionDigits:3});
                    message.channel.send("The All Time High price of **" + coin.name + "** was on " + athDay + " at " + athHour + " GMT: **$" + athPrice + "**\nATH % Change: " + athPctChange +"%\n\nPowered by CoinGecko");
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