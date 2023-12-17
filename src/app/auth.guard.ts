// Import necessary modules from Angular
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root'
})
// Class definition for the AuthGuard service implementing CanActivate interface
export class AuthGuard implements CanActivate {

  // Constructor with dependency injection for AuthService and Router
  constructor(private authService: AuthService, private router: Router) { }

  // Method to determine if the user is allowed to activate the route
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated using the AuthService
    if (this.authService.getAuthenticatedUser()) {
      // If authenticated, allow the route activation
      return true;
    } else {
      // If not authenticated, navigate to the login page and prevent route activation
      this.router.navigate(['/login']);
      return false;
    }
  }

}
