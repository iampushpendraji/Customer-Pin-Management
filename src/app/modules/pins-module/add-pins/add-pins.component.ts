import { Component, OnInit, inject } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.css']
})
export class AddPinsComponent implements OnInit {
  _dataShareService: DataShareService = inject(DataShareService);

  collaboratoryList: string[] = [];


  ngOnInit(): void {
    let storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      this.collaboratoryList = this.getCustomers(JSON.parse(storedCustomers));
    } else {
      this._dataShareService.sendNotification(false, 'Please create customers first !');
    }
  }


  // For filtering customers title only for showing in selection box
  getCustomers(customers: { country: string, email: string, region: string, title: string }[]): string[] {
    return customers.map(e => e.title);
  }


  // For handling on submit event from child component
  onSubmit(data: { [key: string]: any }): void {
    let storedPins: any = localStorage.getItem('pins');
    if (storedPins) {  // If we have stored pins then we will parse and push new entry
      storedPins = JSON.parse(storedPins);
      storedPins.push(data);
    }
    else {  // This is for first time if we don't have data stored in local storage
      storedPins = [data];
    }
    localStorage.setItem('pins', JSON.stringify(storedPins));
    this._dataShareService.sendNotification(true, "Pin created successfully !");
  }

}
