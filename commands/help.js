module.exports = {
    name: 'help',
    description: 'This shows the list of commands available',
    execute(message, args)
    {
        message.channel.send("List of commands: \n!list -- list of all coins you can check with their symbols\n!check 'symbol' -- current prices of coin / % changes\n!ath 'symbol' -- all time high price for coin and date\n!percent 'symbol' -- hourly, daily, weekly, monthly, and annual percent changes");
    }
}