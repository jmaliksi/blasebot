const { getTeam } = require("../util/teamUtils");
const subscriptions = require("../schemas/subscription");

const command = {
    name: "subscribe",
    aliases: [],
    description: "Subscribes a channel to a teams games",
    async execute(message, args) {
        let err, docs = await subscriptions.find({channel_id: message.channel.id});
        if(err) throw err;
        if(docs.length > 0) return message.channel.send("You already have subscibed this channel to a team! use bb!unsubscibr to remove the subscription");

        let team = await getTeam(args.join(" "));
        if(!team) return message.channel.send("I can't find that team!");

        let savErr = new subscriptions({
            channel_id: message.channel.id,
            guild_id: message.guild.id,
            team: team.id
        }).save();
        if(savErr) throw savErr;
        message.channel.send(`Subscribed this channel to the ${team.nickname}'s games!`);

    },
};

module.exports = command;