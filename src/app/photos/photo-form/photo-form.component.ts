import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  public photoForm: FormGroup;
  public file: File;

  constructor(
    private _formBuilder: FormBuilder,
    private _photoService: PhotoService,
    private _router: Router
  ) { }

  ngOnInit() {

    this.photoForm = this._formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true] // default value
    });

  }

  upload() {
    
    const description: string = this.photoForm.get('description').value;
    const allowComments: boolean = this.photoForm.get('allowComments').value;

    this._photoService.upload(description, allowComments, this.file)
      .subscribe(
        () => this._router.navigate(['']),
        err => console.log(err)
      );

  }

}
