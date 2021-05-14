import path from 'path'
import { compilerOptions, Packages, Prompt } from '../..'

export async function single(
  this: Packages,
  group: string,
  file: string,
  filePath: string
) {
  if (!file.endsWith('.ts') || file.endsWith('d.ts')) return
  await this.compile([path.join(filePath, file)], compilerOptions)
  file = file.replace('.ts', '.js')

  const promptPath = path.join(filePath, file)
  const prompt: Prompt = require(promptPath).default
  prompt.path = promptPath
  if (!prompt.name) {
    let name = file.split('.')[0]
    if (!name) return
    prompt.name = name
  }
  this.logLoading('prompts', file, group, prompt.path)
  return prompt
}
