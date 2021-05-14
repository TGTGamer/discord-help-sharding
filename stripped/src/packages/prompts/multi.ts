import fs from 'fs'
import path from 'path'
import { Packages, PromptGroup } from '../..'

export async function multi(
  this: Packages,
  {
    file,
    promptGroup,
    group,
    filepath
  }: {
    file: string
    promptGroup: PromptGroup
    group: string
    filepath: string
  }
) {
  const subprompts = fs.readdirSync(path.join(filepath, file))
  if (!subprompts) return
  subprompts.forEach(async subprompt => {
    if (subprompt.endsWith('.ts')) {
      const prompt = await this.prompts.single(
        group,
        subprompt,
        path.join(filepath, file)
      )
      if (prompt?.name) promptGroup.set(prompt.name, prompt)
    } else {
      const SubPromptGroup: PromptGroup = new this.root.discord.Collection()
      if (subprompt.indexOf('.') !== -1 || subprompt.indexOf('_') == 0) return
      await this.prompts.multi({
        file: subprompt,
        promptGroup: SubPromptGroup,
        group,
        filepath: path.join(filepath, file)
      })
      promptGroup.set(file, SubPromptGroup)
    }
  })
}
