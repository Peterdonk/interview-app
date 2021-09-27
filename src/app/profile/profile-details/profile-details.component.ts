import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegisterModel } from 'src/app/model/auth.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  // input decorator to get user details
  @Input() userData = {} as RegisterModel;

  // output decorator to emit profile change event
  @Output() profileChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  /**
   * send message to profile component
   * @param message to emit
   *
   */
  sendMessageToProfile(message: string) {
    this.profileChange.emit(message);
  }

  ngOnInit(): void {}
}
