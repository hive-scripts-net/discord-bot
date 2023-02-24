const { ActivityType } = require('discord.js')

module.exports = {
    activities: [
        {
            text: 'Kleine Kinder abziehen',
            type: ActivityType.Playing
        },
        {
            text: 'Spielplatzschlägerei',
            type: ActivityType.Competing
        },
        {
            text: 'Visual Studio Code',
            type: ActivityType.Streaming
        },
        {
            text: 'Andrew Tate Podcast',
            type: ActivityType.Listening
        },
        {
            text: 'Steuerhinterziehung für Anfänger',
            type: ActivityType.Watching
        }
    ]
}