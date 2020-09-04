const { messageError } = require("../util/miscUtils");
const io = require("@pm2/io");

const command = {
    name: "help",
    aliases: [],
    description: "displays a list of commands, do help [command] for that commands description\nbb!help\nbb!help [command]",
    async execute(message, args) {
        if(args.length){
            //Looking up a command
            let command = message.client.commands.get(args[0].replace("bb!",""));
            if(!command) return message.channel.send("There is no command with the name "+args[0]).then(global.stats.messageFreq.mark()).catch(messageError);
            return message.channel.send(command.description).then(global.stats.messageFreq.mark()).catch(messageError);

        } else {
            //Listing commands
            console.log(io);
            let commands = message.client.commands.map(c => c.name);
            let commandList = `Command list:\n${message.client.config.prefix}`+commands.join(`\n${message.client.config.prefix}`)+"\n*You can use bb!help [command name] to see the description of a command";
            return message.channel.send(commandList).then(global.stats.messageFreq.mark()).catch(messageError);
        }
    },
};

module.exports = command;