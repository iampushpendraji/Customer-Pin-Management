import { Component, OnInit, inject } from '@angular/core';
import { Toast } from 'bootstrap';
import { DataShareService } from 'src/app/services/data-share.service';

interface NotificationData {
  notificationType: string,
  notificationMessage: string
}

@Component({
  selector: 'app-toaster-common',
  templateUrl: './toaster-common.component.html',
  styleUrls: ['./toaster-common.component.css']
})
export class ToasterCommonComponent implements OnInit {
  _dataShareService: DataShareService = inject(DataShareService);

  notificationType = '';
  notificationMessage = '';
  toast!: Toast;


  constructor() { }


  ngOnInit(): void {
    const toastElement = document.getElementById('liveToast');
    this.toast = new Toast(toastElement!);

    /*
      For showing notification this is an observer which will observe changes
      whenever we will call it from any component it will get triggered
    */
    this._dataShareService.notifyObservable.subscribe((data: NotificationData | null) => { 
      if (data) {
        this.showNotification(data);
      }
    });
  }


  // For showing notification
  showNotification(notificationData: NotificationData): void {
    this.notificationType = notificationData.notificationType;
    this.notificationMessage = notificationData.notificationMessage;
    this.toast.show();
  }

}
