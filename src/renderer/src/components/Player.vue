<script setup lang="ts">
import { Howl } from 'howler'
import { reactive } from 'vue'
import { NSpace, NTable, NAvatar } from 'naive-ui'
// D:/库/desktop/myFavorite.playlist - 副本.json'
// D:/库/desktop/myFavorite.playlist - 副本 - 副本.json'
// D:/库/desktop/myFavorite.playlist.json'
let playlist: Array<{ path: string }>
type musicStruct = {
  title: string
  album: string
  artist: string
  image: string
  path: string
}
type playlistStruct = Array<musicStruct>
const state = reactive({
  toBePlayedList: new Array<musicStruct>(0),
  nopicture: './build/nopicture.png',
  playlistPath: 'D:/库/desktop/myFavorite.playlist - 副本.json'
})

function parsePath(path: string, index: number): void {
  state.toBePlayedList = []
  api
    .getTags(path)
    .then((tags) => {
      const imageData = tags.common.picture ? tags.common.picture[0].data : undefined
      const image = imageData ? URL.createObjectURL(new Blob([imageData])) : undefined

      const result = {
        path,
        title: tags.common.title,
        album: tags.common.album,
        artist: tags.common.artist,
        image: image || state.nopicture
      }
      state.toBePlayedList[index] = result
    })
    .catch((err) => err)
}

function parsePlaylist(): void {
  playlist.forEach((music, index) => {
    const path = music.path

    parsePath(path, index)
  })
}

function initPlaylist(): void {
  playlist.forEach((path) => {
    state.toBePlayedList.push({
      path,
      title: 'notitle',
      album: 'unknown',
      artist: 'unknown',
      image: state.nopicture
    })
  })
}

api
  .getPlaylist(state.playlistPath)
  .then((result) => {
    playlist = result
    initPlaylist()
    parsePlaylist()
  })
  .catch((err) => {
    console.log(err)
  })

  // console.log(playlist);
  
// let sound = new Howl({
//   src: state.toBePlayedList,
//   html5: true
// })
// sound.play()
</script>

<template>
  <!-- vertical -->
  <n-space>
    <n-table :bordered="false" :single-line="true" size="large">
      <thead>
        <tr>
          <th>cover</th>
          <th>title</th>
          <th>artist</th>
          <th>album</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(music, index) in state.toBePlayedList" :key="index" class="music">
          <td>
            <n-avatar
              lazy
              round
              :size="100"
              :src="music.image"
              fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            ></n-avatar>
          </td>
          <td>{{ music.title }}</td>
          <td>{{ music.artist }}</td>
          <td>{{ music.album }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-space>
</template>

<style lang="less" scoped>
.n-card {
  max-width: 800px;
}

n-table {
  margin: 0 20px;

  tbody {
    tr {
      cursor: pointer;
    }
  }
}
</style>
