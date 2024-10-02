import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.css']
})
export class AddPinsComponent implements OnInit {
  
  collaboratoryList: string[] = [];


  ngOnInit(): void {
    let storedCustomers = localStorage.getItem('customers');  
    if (storedCustomers) {
      this.collaboratoryList = this.getCustomers(JSON.parse(storedCustomers));
    }
  }


  // For filtering customers title only for showing in selection box
  getCustomers(customers: { country: string, email: string, region: string, title: string }[]): string[] {
    return customers.map(e => e.title);
  }

}
