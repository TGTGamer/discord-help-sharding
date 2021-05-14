import path from 'path'
import { Command, CommandGroup, Packages } from '../..'
export async function reload(this: Packages, cmd: CommandGroup | Command) {
  let filepath = cmd.path?.split('\\')
  if (!filepath) throw new Error('No Filepath')
  let file = filepath.pop()
  if (!cmd.path || !cmd.module || !file)
    throw new Error(`Something else: ${cmd.path}, ${cmd.module}, ${file}`)
  delete require.cache[require.resolve(cmd.path)]
  this.commands.initialize(
    cmd.module,
    file,
    path.normalize(filepath.join('\\'))
  )
}
