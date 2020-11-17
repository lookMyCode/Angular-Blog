import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      autor: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) return;

    const post: IPost = {
      title: this.form.value.title,
      autor: this.form.value.autor,
      text: this.form.value.text,
      date: new Date()
    }
  }

}
