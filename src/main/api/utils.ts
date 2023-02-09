import { systemPreferences } from 'electron'

function getAccentColor(): string {
  return systemPreferences.getAccentColor()
}

function test(...args): string {
  let result = ''
  args.forEach((arg) => {
    console.log(arg)
    result += arg + ', '
  })
  return result
}

export { getAccentColor, test }
