import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-entity',
  templateUrl: './create-new-entity.component.html',
  styleUrls: ['./create-new-entity.component.css']
})


export class CreateNewEntityComponent implements OnChanges {
  _router = inject(Router);

  @Input() isLoading: boolean = false;
  @Input() moduleName: string = '';
  
  // Pins Related Inputs
  @Input() collaboratoryList: string[] = [];
  
  // Customers Related Inputs
  @Input() regionList: string[] = [];
  @Input() countriesOfRegion: string[] = [];
  

  @Output() regionSelectEmit = new EventEmitter<string>();
  @Output() formSubmitEmit = new EventEmitter<{ [key: string]: any }>();

  addEntityForm: FormGroup = new FormGroup({});


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['moduleName']) {
      this.removeAllControls();

      // Setting controls on the basis of module name
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
        this.addEntityForm.addControl('img', new FormControl('', [Validators.required]));
      }
    }
  }


  // Method to remove all controls
  removeAllControls(): void {
    Object.keys(this.addEntityForm.controls).forEach(control => {
      this.addEntityForm.removeControl(control);
    });
  }


  // Method for emitting selected region value to parent component
  selectRegionHandler(event: any[]): void {
    let selectedRegion = event[0]['value'];
    this.regionSelectEmit.emit(selectedRegion);
  }


  // Method for handling on submit event of reactive form
  submitClickHandler() {
    if (!this.validateForm()) {}
    else {
      this.formSubmitEmit.emit(this.addEntityForm.value);
      this.addEntityForm.reset();
    }
  }


  // Method for marking all the form fields as touched so we can show error on browser
  validateForm(): boolean {
    Object.keys(this.addEntityForm.controls).forEach(controlName => {
      const control = this.addEntityForm.get(controlName);
      if (control) {
        control.markAsTouched();
      }
    });
    return this.addEntityForm.valid;
  }


  // For redirecting to given route
  jumpToPage(path: string): void {
    this._router.navigateByUrl(path);
  }
}
