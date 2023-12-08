import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { QueueService } from 'src/app/shared/queue/queue.service';

@Component({
  selector: 'app-songs-view',
  templateUrl: './songs-view.component.html',
  styleUrls: ['./songs-view.component.scss'],
})
export class SongsViewComponent implements OnInit {
  public id: any;
  song: any;

  genres: any;
  form: FormGroup;
  formEdit: FormGroup;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private apiSrvc: ApiService,
    private router: Router,
  ) {
    this.route.params.subscribe((params) => (this.id = params.id));

    this.apiSrvc.getSong(this.id).subscribe((data) => (this.song = data));
    this.genres = this.apiSrvc.getGenres();

    this.form = this.fb.group({
      title: [''],
      artist: [''],
      genre: [],
    });
  }

  public deleteSong(id: number) {
    this.apiSrvc.deleteSong(id).subscribe();
    this.router.navigate(['/home']);
  }

  submitForm(): void {
    var formData: any = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('artist', this.form.get('artist')?.value);
    formData.append('genre', this.form.get('genre')?.value);
    this.apiSrvc.editSong(formData, this.id).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    );

    this.apiSrvc.getSong(this.id).subscribe((data) => (this.song = data));
  }
  ngOnInit(): void {}
}
