import { fromPath } from '../lib/id3js/id3.js'
import { IAudioMetadata, parseFile } from 'music-metadata'

export function getID3Tags(_e, path: string): Promise<unknown> {
  return fromPath(path)
}

export async function getTags(_e, path: string): Promise<IAudioMetadata> {
  return await parseFile(path)
}
