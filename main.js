const Discord = require('discord.js');

const client = new Discord.Client();

const axios = require('axios');

const prefix = '!';

const fs = require('fs');

const token = 'ODIzMzQxMjAxMjMwMTM1Mjk3.YFfaPw.a15iXmHho1M4WzOnNd_cg67SzZE';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', ()=> 
{
    console.log('Crypto Bot is online')
});

client.on("guildCreate", guild => {
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
      if(channel.type == "text" && defaultChannel == "") 
      {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) 
        {
          defaultChannel = channel;
        }
      }
    })
    //defaultChannel will be the channel object that the bot first finds permissions for
    defaultChannel.send('Hello, thanks for inviting me! Use !help to see a list of commands.')
    });

client.on('message', async message => 
{
    if (!message.content.startsWith(prefix) || message.author.bot) return; //ignores messages that do not start with the prefix or messages sent by the bot
    
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'help')
    {
        client.commands.get('help').execute(message, args);
    }
    else if (command === 'list')
    {
        client.commands.get('list').execute(message, args);
    }
    else if (command === 'percent')
    {
        client.commands.get('percent').execute(message, args);
    }
    else if (command === 'ath')
    {
        client.commands.get('ath').execute(message, args);
    }
    else if (command === 'check')
    {
        client.commands.get('check').execute(message, args);
    }
    else //invalid command
    {
        message.channel.send("Please refer to !help for a list of available commands.")
    }

});


client.login(token);
