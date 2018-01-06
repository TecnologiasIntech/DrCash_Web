import { Directive,EventEmitter,ElementRef,HostListener,Input,Output } from '@angular/core';
import {isUndefined} from "util";
import {FileItem} from "../interfaces/file-item";


@Directive({
  selector: '[NgDropImages]'
})
export class DropImagesDirective {
  // recibiendo archivos del padre
  @Input() archivos:FileItem[] = [];
  //Salida a padre Cuando tienes los archivos sobre el dropZone
  @Output() archivoSobre:EventEmitter<any> = new EventEmitter();

  constructor(public elemento:ElementRef) { }

  //evento cuando tenemos archivos sobre el dropzone
  @HostListener('dragenter',['$event'])
  public onDragEnter(event:any){
    this.archivoSobre.emit(true);
  }

  // evento para quitar el focus cuando sacamos el mouse con los archivos del dropzone
  @HostListener('dragleave',['$event'])
  public onDragleave(event:any){
      this.archivoSobre.emit(false);
  }

  @HostListener('dragover',['$event'])
  public onDragover(event:any){
      let transferencia = this._getTransferencia(event);

      transferencia.dropEffect='copy';

      this._prevenirYdetener( event );

      this.archivoSobre.emit(true);
  }

  @HostListener('drop',['$event'])
  public onDrop(event:any){
     let transferencia = this._getTransferencia(event);

     if(!transferencia){
        return;
     }

     this._agregarArchivos(transferencia.files);

      this.archivoSobre.emit(false);

      this._prevenirYdetener( event );
  }





  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos(archivosLista:FileList){
      for (let propiedad in Object.getOwnPropertyNames(archivosLista)){
          let archivoTemporal = archivosLista[propiedad];
          if(this._archivoPuedeSerCargado(archivoTemporal)){
            let nuevoArchivo = new FileItem(archivoTemporal);
            this.archivos.push(nuevoArchivo);
          }
      }
      console.log(this.archivos)
  }


  private _prevenirYdetener(event: any){
    event.preventDefault();
    event.stopPropagation();
  }

  private  _archivoDropeado(nombreArchivo:string):boolean{
    for(let i in this.archivos){
      let arch = this.archivos[i];
      if(arch.archivo.name== nombreArchivo){
        console.log("Archivo ya existente", nombreArchivo);
        return true;

      }
    }
      return false;
  }

  private  _archivoPuedeSerCargado(archivo:File){
    if(!this._archivoDropeado(archivo.name)&& this.validateOnlyImages( archivo.type)){
      return true;
    }
    return false;
  }

  private validateOnlyImages(tipoArchivo:string):boolean{
    if(tipoArchivo == '' || tipoArchivo == undefined ){
      return false;
    }else{
      if(tipoArchivo.startsWith("image")){
        return true;
      }
    }
  }

}
