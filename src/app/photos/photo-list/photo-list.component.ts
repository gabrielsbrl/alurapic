import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { LoadingService } from 'src/app/shared/components/load/loading.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    //Deve mudar para garantir que o valor capturado da rota e o mais atualizado
    this.activatedRoute.params
      .subscribe(params => {
        this.userName = params.userName;
        this.photos = this.activatedRoute.snapshot.data['photos'];
      })
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false;
      });
  }
}
