<script setup lang="ts">
// import { Howl } from "howler"
import { reactive } from 'vue'
import { NSpace, NTable, NAvatar } from 'naive-ui'
const playlistPath = 'D:/库/desktop/myFavorite.playlist - 副本.json'
// const playlistPath = 'D:/库/desktop/myFavorite.playlist.json'
let playlist: Array<{ path: string }>

const toBePlayedList: Array<{
  title: string
  album: string
  artist: string
  composer: string
  Comment: string
  image: string
  path: string
}> = reactive([])

// function parsePlaylist(): void {
//   playlist.forEach((music, index) => {
//     const path = music.path
//     toBePlayedList.push({
//       path
//     })
//     window.api
//       .getID3Tags(path)
//       .then((tags) => {
//         const imageData = tags.images[0]
//         const image = URL.createObjectURL(new Blob([imageData.data]))
//         const result = {
//           title: tags.title,
//           album: tags.album,
//           artist: tags.artist,
//           composer: tags.composer,
//           Comment: tags.coments,
//           image
//         }
//         console.log(tags)
        
//         Object.assign(toBePlayedList[index], result)
//       })
//       .catch((err) => err)
//   })
// }

// api.getPlaylist(playlistPath)
//   .then((result) => {
//     playlist = JSON.parse(result)
//     parsePlaylist()
//   })
//   .catch((err) => {
//     console.log(err)
//   })


// let sound = new Howl({
//   src: toBePlayedList,
//   html5: true
// })
// sound.play()
// sound
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
        <tr v-for="(music, index) in toBePlayedList" :key="index" class="music">
          <td>
            <n-avatar lazy round :size="100" :src="music.image"></n-avatar>
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
