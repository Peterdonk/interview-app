import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Get user roles in JSON string
   * @returns Observable<any>
   */
  public getUser(): Observable<any> {
    const user: any = localStorage.getItem('user');
    try {
      return of(JSON.parse(user.split(',')));
    } catch (e) {
      return of([]);
    }
  }

  /**
   * Set user roles
   * @param user
   * @returns TokenStorage
   */
  public setUser(key: string, user: any): any {
    if (user != null) {
      localStorage.setItem(key, JSON.stringify(user));
    }

    return this;
  }

  /**
   * Remove all tokens
   */
  public clear(): void {
    localStorage.removeItem('user');

    sessionStorage.removeItem('user');
  }
}
