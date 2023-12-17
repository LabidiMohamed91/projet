// Import necessary modules from Angular
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

// Component decorator
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// Class definition for the component
export class LoginPage {

  // Properties to hold user input and error message
  email: string = ''; // User's email input
  password: string = ''; // User's password input
  errorMessage: string = ''; // Error message to display if login fails

  // Constructor with dependency injection for AuthService and Router
  constructor(private authService: AuthService, private router: Router) { }

  // Method to handle the login process
  login() {
    // Check if the login credentials are valid using the AuthService
    if (this.authService.login(this.email, this.password)) {
      // If valid, navigate to the home page
      this.router.navigate(['/home']);
    } else {
      // If invalid, set an error message to be displayed
      this.errorMessage = 'Bad credentials';
    }
  }
}
