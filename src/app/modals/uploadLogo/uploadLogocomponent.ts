import {Component, HostListener, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {FileItem} from "../../interfaces/file-item";

@Component({
    selector: 'app-carga',
    templateUrl: './uploadLogo.component.html',
    styleUrls: ['./uploadLogo.component.scss']
})
export class UploadLogocomponent implements OnInit {

    aboveDropZone: boolean = false;
    permiteCargar: boolean = true;

    archivos: FileItem[] = [];

    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    archivoSobreDropZone(evento: boolean) {
        this.aboveDropZone = evento;
    }

    clearFiles() {
        this.archivos = [];
        this.permiteCargar = true;
    }

    cargarMultimediaFirebase(archivos: FileItem[]) {
        this.permiteCargar = false;
        // this._cargaMultimediaService.cargarImagenesFirebase(archivos);
    }

    closeModal() {
        this.activeModal.close(this.archivos);
    }


}
