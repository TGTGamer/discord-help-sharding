import { Packages, PromptGroup } from '../..'

export async function initialize(
  this: Packages,
  group: string,
  file: string,
  filepath: string
) {
  if (file.indexOf('_') == 0 || file.endsWith('.md')) return
  const promptGroup: PromptGroup =
    this.root.modules.prompts.get(group) || new this.root.discord.Collection()
  this.root.modules.prompts.set(group, promptGroup)
  if (file.endsWith('.ts')) {
    const prompt = await this.prompts.single(group, file, filepath)
    if (prompt?.name) promptGroup.set(prompt.name, prompt)
  } else {
    const SubPromptGroup: PromptGroup = new this.root.discord.Collection()
    await this.prompts.multi({
      file,
      promptGroup: SubPromptGroup,
      group,
      filepath
    })
    promptGroup.set(file, SubPromptGroup)
  }
  this.root.modules.prompts.set(group, promptGroup)
}
