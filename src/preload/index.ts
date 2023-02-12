import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IAudioMetadata } from 'music-metadata'

// Custom APIs for renderer
const api = {
  getAccentColor(): Promise<string | null> {
    return ipcRenderer.invoke('utils:getAccentColor')
  },
  test(...args): Promise<string | null> {
    return ipcRenderer.invoke('utils:test', ...args)
  },
  getTags(path: string): Promise<IAudioMetadata> {
    return ipcRenderer.invoke('getTags', path)
  },
  getID3Tags(path: string): Promise<unknown> {
    return ipcRenderer.invoke('getID3Tags', path)
  },
  getPlaylist(path: string): Promise<unknown> {
    return ipcRenderer.invoke('getPlaylist', path)
  },
  savePlaylist(path: string, data: unknown): Promise<void> {
    return ipcRenderer.invoke('savePlaylist', path, data)
  }
  // getAllPlaylistPath(): Promise<>
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
