import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { QueueService } from 'src/app/shared/queue/queue.service';
import { User } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public UserProfile: User;

  form: FormGroup;
  formQueue: FormGroup;

  public queue: any;
  public playlists: any;
  allSongs: any;

  constructor(public fb: FormBuilder, private apiSrvc: ApiService, private authService: AuthService, public QueueSrvc: QueueService) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });

    this.form = this.fb.group({
      title: [''],
      description: [''],
      image: ['placeholder.png'],
      user_id: [],
    });

    this.formQueue = this.fb.group({
      song: [],
    });

    this.queue = QueueSrvc.getSongsFromQueue();
    this.allSongs = this.apiSrvc.getSongs();

    this.authService.profileUser().subscribe((data: any) => {
      this.playlists = this.apiSrvc.getPlaylistsFromUser(data.id);
    });
  }

  public deleteFromQueue(index: any){
    this.QueueSrvc.deleteFromQueue(index);
    this.queue = this.QueueSrvc.getSongsFromQueue();
  }

  public refreshData(): void {
    this.authService.profileUser().subscribe((data: any) => {
      this.playlists = this.apiSrvc.getPlaylistsFromUser(data.id);
    });
  }

  public deletePlaylist(id: number) {
    this.apiSrvc.deletePlaylist(id).subscribe(() => {
      this.authService.profileUser().subscribe((data: any) => {
        this.playlists = this.apiSrvc.getPlaylistsFromUser(data.id);
      });
    });
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("title", this.form.get('title')?.value);
    formData.append("description", this.form.get('description')?.value);
    formData.append("image", this.form.get('image')?.value);
    formData.append("user_id", this.UserProfile.id);
    this.apiSrvc.addPlaylist(formData).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    )
    this.refreshData();
  }

  submitQueueForm() {
    this.QueueSrvc.addSongToQueue(this.formQueue.get('song')?.value);
    this.queue = this.QueueSrvc.getSongsFromQueue();
  }

  ngOnInit(): void {}
}
