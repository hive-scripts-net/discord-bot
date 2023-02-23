import { ActivityType } from "discord.js"

interface Activity {
    text: string,
    type: ActivityType.Competing | ActivityType.Playing | ActivityType.Watching | ActivityType.Streaming | ActivityType.Listening
}

export const activities: Activity[] = [
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
    },
]