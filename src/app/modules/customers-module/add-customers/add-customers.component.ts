import { Component, OnInit, inject } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { DataShareService } from 'src/app/services/data-share.service';

interface CountryInfo {
  country: string;
  region: string;
}

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})

export class AddCustomersComponent implements OnInit {
  private _apiCallService: ApiCallService = inject(ApiCallService);
  private _dataShareService: DataShareService = inject(DataShareService);

  public isLoading: boolean = false;
  public regionData: Record<string, CountryInfo> = {};
  public regionList: string[] = [];
  public countriesOfRegion: string[] = [];


  constructor() { }

  
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const storedRegionData = localStorage.getItem('region-data');

    if (storedRegionData) {
      this.regionData = JSON.parse(storedRegionData);
    } else {
      this.regionData = await this.getRegionList();
    }

    this.regionList = this.filterRegionList(this.regionData);
    this.isLoading = false;
  }


  // For getting region data here we are handling API call as well
  private getRegionList(): Promise<Record<string, CountryInfo>> {
    return new Promise((resolve, reject) => {
      this._apiCallService.getCountryList().subscribe({
        next: (response) => {
          if (response.status === 'OK') {
            localStorage.setItem('region-data', JSON.stringify(response.data));
            resolve(response.data);
          } else {
            this._dataShareService.sendNotification(false, 'Error in getting region data !');
            reject('Error in getting region data');
          }
        },
        error: (error) => {
          this._dataShareService.sendNotification(false, 'Error in getting region data !');
          reject('Error in getting region data, ERROR -->> ' + error);
        }
      });
    });
  }


  // For getting region list (string[]) from region data which we got from API response
  private filterRegionList(regionData: Record<string, CountryInfo>): string[] {
    let tempSet = new Set();
    for (let data in regionData) {
      tempSet.add(regionData[data]['region']);
    }
    return [...tempSet] as string[];
  }

  
  // For filtering countries on the basis of selected region
  getCountriesFromRegion(selectedRegion: string): void {
    let tempArray = new Set();
    for (let data in this.regionData) {
      if (this.regionData[data]['region'] == selectedRegion) {
        tempArray.add(this.regionData[data]['country']);
      }
    }
    this.countriesOfRegion = [...tempArray] as string[];
  }


  // For handling on submit event from child component
  onSubmit(data: { [key: string]: any }): void {
    let storedCustomers: any = localStorage.getItem('customers');
    if (storedCustomers) {  // If we have stored customers then we will parse and push new entry
      storedCustomers = JSON.parse(storedCustomers);
      storedCustomers.push(data);
    }
    else {  // This is for first time if we don't have data stored in local storage
      storedCustomers = [data];
    }
    localStorage.setItem('customers', JSON.stringify(storedCustomers));
    this._dataShareService.sendNotification(true, "Customer created successfully !");
  }

}
