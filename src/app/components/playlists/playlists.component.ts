import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  public id: number;
  public rowData: any;
  public playlist: any;
  public songs: any[];
  public allSongs: any;

  form: FormGroup;
  formEdit: FormGroup;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private apiSrvc: ApiService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.id = params.id));

    this.apiSrvc
      .getPlaylist(this.id)
      .subscribe((data) => (this.playlist = data));
    this.form = this.fb.group({
      song: [],
    });

    this.formEdit = this.fb.group({
      title: [''],
      description: [''],
      image: ['placeholder.png'],
    });

    this.apiSrvc
      .getSongsFromPlaylist(this.id)
      .subscribe((data) => (this.songs = data));
    this.allSongs = this.apiSrvc.getSongs();
  }

  public deletePlaylist(id: number) {
    this.apiSrvc.deletePlaylist(id).subscribe();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {}

  submitAddSongForm() {
    var formData: any = new FormData();
    formData.append('song_id', this.form.get('song')?.value);
    this.apiSrvc.addSongToPlaylist(this.playlist.id, formData).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    );

    this.apiSrvc
      .getSongsFromPlaylist(this.id)
      .subscribe((data) => (this.songs = data));
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append('title', this.formEdit.get('title')?.value);
    formData.append('description', this.formEdit.get('description')?.value);
    formData.append('image', this.formEdit.get('image')?.value);
    this.apiSrvc.editPlaylist(formData, this.playlist.id).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    );
    this.apiSrvc
      .getPlaylist(this.id)
      .subscribe((data) => (this.playlist = data));
  }
}
