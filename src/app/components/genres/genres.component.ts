import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  public genres: any[];
  public form: FormGroup;
  public genre: any;
  constructor(private apiSrvc: ApiService, private fb: FormBuilder) {
    this.apiSrvc.getGenres().subscribe((data) => {
      this.genres = data;
    });

    this.form = this.fb.group({
      name: [''],
    });
  }

  getGenre(id: number){
    this.apiSrvc.getGenre(id).subscribe((data)=>{
      this.genre = data;
    })
    console.log(this.genre)
  }

  deleteGenre(id: number): void {
    this.apiSrvc.deleteGenre(id).subscribe();
    this.apiSrvc.getGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.form.get('name')?.value);
    this.apiSrvc.addGenre(formData).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    )
    this.apiSrvc.getGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  submitEditForm(id: number) {
    var formData: any = new FormData();
    formData.append("name", this.form.get('name')?.value);
    this.apiSrvc.editGenre(formData, id).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    )
    this.apiSrvc.getGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  ngOnInit(): void {}
}
