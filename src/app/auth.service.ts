// Import necessary modules from Angular
import { Injectable } from '@angular/core';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root'
})
// Class definition for the AuthService
export class AuthService {

  // Property to store the currently authenticated user
  private authenticatedUser: any = null;

  // Array of mock user data
  private users = [
    { id: 1, fullname: 'hamza', password: 'password', email: 'hamza@example.com' },
    { id: 2, fullname: 'hama', password: 'password', email: 'hama@example.com' },
    { id: 3, fullname: 'wael', password: 'password', email: 'wael@example.com' },
  ];

  // Constructor
  constructor() { }

  // Method to get all users
  getAllUsers() {
    return this.users;
  }

  // Method to get the currently authenticated user
  getAuthenticatedUser() {
    return this.authenticatedUser;
  }

  // Method to perform login based on email and password
  login(email: string, password: string): boolean {
    // Find a user with matching email and password
    const user = this.users.find(u => u.email === email && u.password === password);

    // If a matching user is found, set them as the authenticated user and return true
    if (user) {
      this.authenticatedUser = { id: user.id, fullname: user.fullname, email: user.email };
      return true;
    }

    // If no matching user is found, return false
    return false;
  }

  // Method to perform user registration
  signUp(fullname: string, email: string, password: string): boolean {
    // Create a new user object with the provided data
    const newUser = { fullname, email, password };

    // Check if a user with the same email already exists
    const existingUser = this.users.find(u => u.email === newUser.email);

    // If an existing user is found, return false (registration failed)
    if (existingUser) {
      return false;
    }

    // Generate a new user ID and create a new user object
    const newUserId = this.users.length + 1;
    const userToAdd = { id: newUserId, ...newUser };

    // Add the new user to the array of users
    this.users.push(userToAdd);

    // Set the new user as the authenticated user
    this.authenticatedUser = { id: newUserId, fullname: newUser.fullname, email: newUser.email };

    // Return true indicating successful registration
    return true;
  }

  // Method to log out the currently authenticated user
  logout() {
    this.authenticatedUser = null;
  }

}
