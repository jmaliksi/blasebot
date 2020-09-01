const { getTeam } = require("../util/teamUtils");
const {scores} = require("../schemas/subscription");

const command = {
    name: "scores",
    aliases: [],
    description: "Subscribes a channel to a teams game scores\nThe bot will update the channel whenever score changes\nA guild is only allowed one score tracking of each team, but unlike subscripitions they can share a channel\nbb!scores [team name]",
    async execute(message, args) {

        if(!message.guild) return message.channel.send("This command must be used in a guild!").catch(console.error);
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")) return message.channel.send("You require the manage channel permission to run this command!").catch(console.error);

        let team = await getTeam(args.join(" "));
        if(!team) return message.channel.send("I can't find that team!").catch(console.error);

        let err, docs = await scores.find({guild_id:message.guild.id, team:team.id});
        if(err) throw err;
        if(docs.length > 0) return message.channel.send("You already have subscibed to this teams score updates! use bb!unscore to remove the summaries").catch(console.error);

        // eslint-disable-next-line no-unused-vars
        let savErr, doc = new scores({
            channel_id: message.channel.id,
            guild_id: message.guild.id,
            team: team.id
        }).save();
        if(savErr) throw savErr;
        return message.channel.send(`Subscribed this channel to the ${team.nickname}'s score updates!`).catch(console.error);
    },
};

module.exports = command;