import { parseFile } from 'music-metadata'
import { fromPath } from '../lib/id3js/id3.js'

export function getID3Tags(_e, path: string): Promise<unknown> {
  return fromPath(path)
}

export function getTags(_e, path: string): Promise<void> {
  console.log(parseFile)

  // parseFile(path)
  //   .then((metadata) => metadata)
  //   .catch((err) => err)
  return new Promise(() => {})
}
