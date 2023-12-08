import { Injectable } from '@angular/core'
import { ApiService } from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private ApiSrvc: ApiService) {}

  addSongToQueue(id: number) {
    let queueStr: any = sessionStorage.getItem('queue')
    if (!queueStr) {
      let arr = [id]
      sessionStorage.setItem('queue', JSON.stringify(arr))
    } else {
      let queue = JSON.parse(queueStr)
      queue.push(id)
      sessionStorage.setItem('queue', JSON.stringify(queue))
    }
  }

  getSongsFromQueue() {
    let queue: any = sessionStorage.getItem('queue')
    queue = JSON.parse(queue)
    return this.ApiSrvc.getQueueSongs({ queue: queue })
  }

  deleteFromQueue(index: any) {
    let queueStr: any = sessionStorage.getItem('queue')
    let queue = JSON.parse(queueStr);
    queue.splice(index, 1);
    sessionStorage.setItem('queue', JSON.stringify(queue))
  }

  addAsPlaylist(){
    let queueStr: any = sessionStorage.getItem('queue')
    let queue = JSON.parse(queueStr);
  }
}
