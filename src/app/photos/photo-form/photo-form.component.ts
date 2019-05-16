import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  public photoForm: FormGroup;
  public file: File;
  public preview = '';
  public percentDone: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _photoService: PhotoService,
    private _router: Router,
    private _alertService: AlertService,
    private _userService: UserService
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

    this._photoService
      .upload(description, allowComments, this.file)
      .subscribe((event: HttpEvent<any>) => {
        if(event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if(event instanceof HttpResponse) {
          this._alertService.success('Upload complete');
          this._router.navigate(['user', this._userService.getUserName()]);
        }
      });

  }

  handleFile(file: File) {
    this.file = file;
    //Instancia um leitor de arquivos padrao do JS
    const reader = new FileReader();
    //Le o arquivo em base 64
    reader.readAsDataURL(file); // data 64
    //aguarda a leitura do arquivo ser completada
    reader.onload = (event: any) => this.preview = event.target.result;
  }

}
