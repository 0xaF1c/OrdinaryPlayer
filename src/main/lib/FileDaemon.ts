import * as fs from 'fs'
export class FileDaemon {
  path: string
  data: string | undefined
  fd: number | undefined
  _encoding: string
  constructor(path) {
    this._encoding = 'utf-8'
    this.path = path
  }
  read(): Promise<unknown | string> {
    return new Promise((resolve, reject) => {
      if (!this.fd) {
        reject(this.log('please open before read'))
        return
      }
      fs.readFile(this.fd, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(this.log(err))
        } else {
          this.data = data
          resolve(this.data)
        }
      })
    })
  }
  save(): Promise<string> {
    return new Promise((_r, reject) => {
      if (!this.fd) {
        reject(this.log('please open before save'))
        return
      }
      if (this.data === undefined) {
        reject(this.log('data is not defined'))
        return
      }
      fs.writeFile(this.fd, this.data, { encoding: 'utf8', flag: 'w+' }, (err) => {
        if (err) {
          reject(this.log(err))
        } else {
          this.log(`saved`)
        }
      })
    })
  }
  open(): Promise<number | string> {
    return new Promise((resolve, reject) => {
      fs.open(this.path, 'r', (err, fd) => {
        if (err) {
          reject(this.log(err))
        } else {
          this.fd = fd
          resolve(fd)
        }
      })
    })
  }
  close(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.fd) {
        reject(this.log(`not open`))
        return
      }
      fs.close(this.fd, (err) => {
        if (err) {
          reject(this.log(err))
        } else {
          resolve(this.log(`closed`))
        }
      })
    })
  }
  toString(): unknown {
    return this.data
  }
  log(info: unknown): string {
    return `resource: [${this.path}] ${info}`
  }
  static _CLOSE_RESOURCE(fd: number): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.close(fd, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('success')
        }
      })
    })
  }
}

// export class ConfiguationManager extends FileManager {
//   constructor(path) {

//   }

//   async init() {

//   }
// }

export class PlaylistFileDaemon extends FileDaemon {
  path: string
  parsedData:
    | Array<{
        path: string
      }>
    | undefined

  constructor(path) {
    super(path)
    this.path = path
  }

  async init(): Promise<boolean> {
    const opened = await this.open()
    const readed = opened ? await this.read() : undefined

    if (readed && typeof this.data === 'string') {
      this.parsedData = JSON.parse(this.data)
      return true
    } else {
      return false
    }
  }

  exit(): void {
    this.save()
      .then((_result) => {
        this.close()
      })
      .catch((err) => err)
  }
}
