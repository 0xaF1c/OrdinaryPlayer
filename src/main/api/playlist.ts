import { PlaylistFileDaemon } from '../lib/FileDaemon'

/**
 * get all configraution playlist
 * @returns playlist path
 */
export function getAllPlaylistPath(_e): unknown {
  return {}
}
/**
 * @param path playlist path
 * @returns data
 */
export async function getPlaylist(_e, path: string): Promise<Array<{ path: string }> | Error> {
  const pfd = new PlaylistFileDaemon(path)

  let data: Array<{ path: string }> | undefined = undefined
  if (await pfd.init()) {
    data = pfd.parsedData
  } else {
    return new Error('FileDaemon init error')
  }

  if (data) {
    pfd.exit()
    return data
  } else {
    pfd.exit()
    return new Error('data not found')
  }
}

export async function savePlaylist(_e, path: string, data: string): Promise<void> {
  const pfd = new PlaylistFileDaemon(path)

  pfd.data = data
  pfd.exit()
}
