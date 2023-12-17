// Import necessary modules from Angular
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root'
})
// Class definition for the UnauthenticatedGuard service implementing CanActivate interface
export class UnauthenticatedGuard implements CanActivate {

  // Constructor with dependency injection for AuthService and Router
  constructor(private authService: AuthService, private router: Router) { }

  // Method to determine if the user is not authenticated and can activate the route
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is not authenticated using the AuthService
    if (!this.authService.getAuthenticatedUser()) {
      // If not authenticated, allow the route activation
      return true;
    } else {
      // If authenticated, navigate to the home page and prevent route activation
      this.router.navigate(['/home']);
      return false;
    }
  }

}
