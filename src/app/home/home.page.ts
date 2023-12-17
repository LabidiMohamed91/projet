// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';

// Component decorator
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// Class definition for the component implementing OnInit interface
export class HomePage implements OnInit {
  // Properties to hold product and user information
  products: any[]; // Array to store all products
  filteredProducts: any[]; // Array to store filtered products based on search
  authenticatedUser: any; // Object to store information about the authenticated user

  // Constructor with dependency injection for ProductService and AuthService
  constructor(private productService: ProductService, private authService: AuthService) {
  }

  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    // Get information about the authenticated user
    this.authenticatedUser = this.authService.getAuthenticatedUser();

    // Subscribe to the products observable in the ProductService
    this.productService.products$.subscribe(products => {
      // Update the products array and the filteredProducts array
      this.products = products;
      this.filteredProducts = [...this.products];
    });
  }

  // Method to filter products based on a search term
  filterProducts(event: any) {
    // Get the search term from the input event
    const searchTerm = event.target.value.toLowerCase();

    // Update the filteredProducts array based on the search term
    this.filteredProducts = this.products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    });
  }
}
