import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/PhotoComment';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input()
    public photoId: number;

    public commentForm: FormGroup;

    public comments$: Observable<PhotoComment[]>

    constructor(
        private _photoService: PhotoService,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.comments$ = this._photoService.getComments(this.photoId);
        this.commentForm = this._formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save() {

        const comment:string = <string>this.commentForm.get('comment').value;
        
        this.comments$ = this._photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this._photoService.getComments(this.photoId)))
            .pipe(tap(() => this.commentForm.reset()));
            
    }

}