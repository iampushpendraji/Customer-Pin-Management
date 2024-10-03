import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface NotificationData {
  notificationType: string,
  notificationMessage: string
}

@Injectable({
  providedIn: 'root'
})

export class DataShareService {
  private notifySubject = new BehaviorSubject<NotificationData | null>(null);
  notifyObservable = this.notifySubject.asObservable();


  constructor() { }


  // For sending notification ( It will basically show toaster on screen )
  sendNotification(status: boolean, message: string) {
    let obj = {
      notificationType: status ? 'success' : 'danger',
      notificationMessage: message
    }
    this.notifySubject.next(obj);
  }

}
