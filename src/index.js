const { Client, Collection, SlashCommandBuilder } = require('discord.js')
const { activities } = require('./activities/activities')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config()

const client = new Client({
    intents: [
        'Guilds', 'GuildMembers'
    ],
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`)

    // deploy global commands
    client.application?.commands.set(client.commands.map(command => command.data))

    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)]
        client.user?.setPresence({
            status: 'idle',
            activities: [{ name: activity.text, type: activity.type }]
        })
    }, 1000 * 6)
})

process.on('SIGINT', () => {
    client.user?.setPresence({
        status: 'invisible',
        activities: []
    })
    process.exit(0)
})

client.login(process.env.TOKEN)