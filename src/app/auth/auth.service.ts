import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('currentUser')
  );

  isLoggedIn$ = this.loggedIn$.asObservable();

  // REGISTER
  register(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
      return false;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  // LOGIN
  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return false;

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.loggedIn$.next(true);
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
