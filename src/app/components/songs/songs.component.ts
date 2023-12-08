import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {
  public songs: any[];
  public genres: any;
  form: any;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private apiSrvc: ApiService
  ) {
    this.apiSrvc.getSongs().subscribe((data) => (this.songs = data));
    this.genres = this.apiSrvc.getGenres();

    this.form = this.fb.group({
      title: [''],
      artist: [''],
      genre: [],
    });
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('artist', this.form.get('artist')?.value);
    formData.append('genre', this.form.get('genre')?.value);
    this.apiSrvc.addSong(formData).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    );

    this.apiSrvc.getSongs().subscribe((data) => (this.songs = data));
  }

  ngOnInit(): void {}
}
