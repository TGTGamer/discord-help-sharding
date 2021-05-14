import { EventFileSingle, Interaction } from '../../../typing'
import { runCommands } from '../_commands'

export const Event: EventFileSingle = {
  execute: async function (this, interaction: Interaction) {
    if (!interaction.isCommand()) return
    interaction.recievedTime = new Date()
    interaction.author = interaction.user
    interaction.prefix = '/ '
    runCommands.bind(this)(interaction)
  }
}

export default Event
