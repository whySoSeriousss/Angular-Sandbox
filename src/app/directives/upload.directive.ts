import { Directive, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';


@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {

  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
    this.background = '#9ecbec';
    this.opacity = '0.8';  
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
    this.background = '#fff';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event']) onDrop(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
    this.background = '#f5fcff';
    this.opacity = '1';
    let files = evt.dataTransfer.files;

    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
    
  }

}
