import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent {
  constructor(private http:HttpClient){}
 
  public message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  public uploadFile = (files: string | any) => {
    if (files.length === 0)
      return;
    let fileTOUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileTOUpload, fileTOUpload.name)
    this.http.post('https://localhost:7205/api/Upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => { 
        if(event.type===HttpEventType.Response){
          this.message='Upload Successfull';
          this.onUploadFinished.emit(event.body);
         }
      });
  }
}
