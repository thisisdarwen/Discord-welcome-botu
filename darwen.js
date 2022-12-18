const Discord = require('discord.js');
const tokens = [
    "MTAxNTk3ODUzNDY5NjY0ODc3NQ.GF3iTa.d4I6nrW-EPV7HUsMCiZ12BsQeeD8gAHPNYjzNY",
	"MTAxNTk3OTM3MDMxOTQ2MjQ2MA.Gc1V8-.Jp6HSwPlza2ktTyawsqqk2WZ8Dy2gE1JqZdlVo",
	"MTAxNTk3OTc2MTQ3NjA1MTA1NQ.GASi97.uyEuyLO3FD2eaNKqmWc8sB8tRjZkgPopxb2sP4",
	"MTAxNTk4MDEzMDU3OTAwMTM4NA.GjU0xS.OnltBRFQ1riIVNbzmS0JDAQrrkSSTeV_zKlSWk",
	"MTAxNTk4MDQ0NDQ5NzQ4OTkyMA.GSury0.Z9h03JYusgToqyOIxc2l59JmTvCzSPGWJq42s0"
];
const chnls = [
    "1014361950379069551",
	"1014361952924991589",
	"1014361955575808131",
	"1014361958125944913",
	"1014361960550236261"
];
const selamlı = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(client.user.username);
        await client.user.setActivity({
            name: "This is Comba Voice",
            type: "LISTENING",
            status : "idle"
            
        });
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("1008340923496796200").rawPosition)) {//Hosgeldin ıd'si
                ses = await concon.play('./hosgeldin.mp3');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get("1008340845184954419").rawPosition) { //Yetkili Id'si
                ses = await concon.play('./yetkili.mp3');
                selamlı.push(cur.member.user.id);
            }
        }
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })
}