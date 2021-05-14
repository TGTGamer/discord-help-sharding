import path from 'path'
import { compilerOptions, EventFile, Packages } from '../..'

export async function initialize(
  this: Packages,
  group: string,
  file: string,
  filePath: string
) {
  if (!file.endsWith('.ts') || file.endsWith('d.ts')) return
  await this.compile([path.join(filePath, file)], compilerOptions)
  file = file.replace('.ts', '.js')

  const eventPath = path.join(filePath, file)
  const eventFile: EventFile = require(eventPath).default
  eventFile.path = eventPath
  if ('events' in eventFile) {
    for (let event in eventFile.events) {
      let e = eventFile.events[event]
      if (!e) return
      this.root.on(event, e.bind(this.root))
      this.logLoading('events', event, group, eventFile.path)
    }
  } else {
    if (!eventFile.name) {
      let name = file.split('.')[0]
      if (!name) return
      eventFile.name = name
    }
    this.root.client.on(eventFile.name, eventFile.execute.bind(this.root))
    this.root.on(eventFile.name, eventFile.execute.bind(this.root))
    this.logLoading('events', file, group, eventFile.path)
  }
}
