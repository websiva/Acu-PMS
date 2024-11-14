import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = "https://localhost:7092";
  private tokenKey: string = "";
  private roleKey: string = "";
  constructor(private httpClient: HttpClient, private router: Router) { }


  login(userName: string, password: string) {
    const loginData = { userName, password };

    return this.httpClient.post<{ token: string, role: string }>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token); // Store the JWT token
          localStorage.setItem(this.roleKey, response.role); // Store the user role
          this.redirectUser(response.role); // Redirect based on role
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey); // Remove token
    localStorage.removeItem(this.roleKey); // Remove role
    this.router.navigate(['/login']); // Redirect to login page
  }


  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  get userRole(): string {
    return localStorage.getItem(this.roleKey) || "";
  }


  private redirectUser(role: string) {
    if (role == "Super-admin") {
      this.router.navigate(['/sa-dashboard']);
    }
    else if (role == "Admin") {
      this.router.navigate(['/dashboard']);
    }
  }
}

