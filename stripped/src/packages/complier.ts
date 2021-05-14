import { LoggingLevels } from '@videndum/utilities'
import fs from 'fs'
import ts from 'typescript'
import { Packages } from '..'

export async function compile(
  this: Packages,
  filepaths: string[],
  options: ts.CompilerOptions
) {
  filepaths = filepaths.filter(cur => checkModified(cur))
  if (filepaths.length == 0) return
  let program = ts.createProgram(filepaths, options)
  let emitResult = program.emit()

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!
      )
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      )
      this.root.log(
        LoggingLevels.error,
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      )
    } else {
      this.root.log(
        100,
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      )
    }
  })

  let exitCode = emitResult.emitSkipped ? 1 : 0
  this.root.log(
    exitCode == 1 ? LoggingLevels.error : LoggingLevels.debug,
    `Compiler Process exiting with code '${exitCode}' for files: '${filepaths.toString()}'.`
  )
}

function checkModified(cur: string) {
  const javaFile = fs.existsSync(cur.replace('.ts', '.js'))
  if (!javaFile) return true //?
  const javaFileStats = fs.statSync(cur.replace('.ts', '.js'))
  const tsFileStats = fs.statSync(cur)
  if (javaFileStats.mtimeMs <= tsFileStats.mtimeMs) {
    bumpFiles(cur)
    return true
  }
  return false
}

async function bumpFiles(file: string) {
  // files.forEach(file => {
  let read = fs.readFileSync(file).toString() //?
  const versioning = read.match('version: [1-9]+,') //?
  const number = versioning?.[0]?.match('[1-9]+') //?
  const version = Number(number?.[0]) + 1
  //?
  if (versioning && versioning[0])
    read = read.replace(
      versioning[0],
      versioning[0]?.slice(0, 9 - versioning?.[0].length) + version + ','
    )

  fs.writeFileSync(file, read)
  // })
}
