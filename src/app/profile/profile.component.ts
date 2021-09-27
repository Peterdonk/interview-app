import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../model/auth.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // input decorator to get user details
  user = {} as RegisterModel;

  constructor(private storage: StorageService, private router: Router) {}

  sendMessage(message: string): void {
    alert(message);
  }

  ngOnInit(): void {
    this.storage.getUser().subscribe((res: any) => {
      this.user = res ?? {};
      if (Object.keys(this.user).length === 0) {
        return this.router.navigate(['/auth/register']);
      }
      return;
    });
  }
}
