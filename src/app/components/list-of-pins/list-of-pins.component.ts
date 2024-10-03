import { AfterViewInit, Component, inject } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-list-of-pins',
  templateUrl: './list-of-pins.component.html',
  styleUrls: ['./list-of-pins.component.css']
})
export class ListOfPinsComponent {
  _dataShareService = inject(DataShareService);
  pins: any = [];

  constructor() {
    let pin: string | null = localStorage.getItem('pins');
    this.pins = pin ? JSON.parse(pin) : [];
    
    if(this.pins.length == 0) {
      this._dataShareService.sendNotification(false, 'No pins available please create some !');
    }
  }

}
