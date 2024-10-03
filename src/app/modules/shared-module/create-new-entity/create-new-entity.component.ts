import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { DataShareService } from 'src/app/services/data-share.service';


function readBase64(file: any): Promise<any> {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}


@Component({
  selector: 'app-create-new-entity',
  templateUrl: './create-new-entity.component.html',
  styleUrls: ['./create-new-entity.component.css']
})


export class CreateNewEntityComponent implements OnChanges {
  _router = inject(Router);
  _dataShareService = inject(DataShareService);

  @Input() isLoading: boolean = false;
  @Input() moduleName: string = '';
  @Input() collaboratoryList: string[] = [];
  @Input() regionList: string[] = [];
  @Input() countriesOfRegion: string[] = [];

  @Output() regionSelectEmit = new EventEmitter<string>();
  @Output() formSubmitEmit = new EventEmitter<{ [key: string]: any }>();

  addEntityForm: FormGroup = new FormGroup({});

  public uploader: FileUploader = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    disableMultipart: true
  });

  public hasBaseDropZoneOver: boolean = false;
  selectedFileName: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['moduleName']) {
      this.removeAllControls();

      if (this.moduleName == "Create Customer") {
        this.addEntityForm.addControl('title', new FormControl('', Validators.required));
        this.addEntityForm.addControl('email', new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]));
        this.addEntityForm.addControl('region', new FormControl('', Validators.required));
        this.addEntityForm.addControl('country', new FormControl('', [Validators.required]));
      }

      if (this.moduleName == "Create Pin") {
        this.addEntityForm.addControl('title', new FormControl('', Validators.required));
        this.addEntityForm.addControl('collaboratory', new FormControl('', [Validators.required]));
        this.addEntityForm.addControl('privacy', new FormControl('private', Validators.required));
        this.addEntityForm.addControl('img', new FormControl('', [Validators.required])); // Keep the control for the image
      }
    }
  }

  removeAllControls(): void {
    Object.keys(this.addEntityForm.controls).forEach(control => {
      this.addEntityForm.removeControl(control);
    });
  }

  selectRegionHandler(event: any[]): void {
    let selectedRegion = event[0]['value'];
    this.regionSelectEmit.emit(selectedRegion);
  }

  submitClickHandler() {
    if (this.validateForm()) {
      this.formSubmitEmit.emit(this.addEntityForm.value);
      this.addEntityForm.reset();
      this.selectedFileName = "";
    } else {
      this._dataShareService.sendNotification(false, 'Please fill all the required inputs !');
    }
  }

  validateForm(): boolean {
    Object.keys(this.addEntityForm.controls).forEach(controlName => {
      const control = this.addEntityForm.get(controlName);
      if (control) {
        control.markAsTouched();
      }
    });
    return this.addEntityForm.valid;
  }

  jumpToPage(path: string): void {
    this._router.navigateByUrl(path);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileSelected(event: any) {
    if (event.length > 1) {
      return this._dataShareService.sendNotification(false, 'It does not support multiple file upload');
    }
    const file: File = event[0];
    console.log(file);
    readBase64(file)
      .then((data) => {
        console.log(data);
        this.selectedFileName = file.name;
        this.addEntityForm['controls']['img'].patchValue(data);
      });
  }

}
