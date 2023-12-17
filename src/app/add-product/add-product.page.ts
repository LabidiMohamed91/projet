// Import necessary modules from Angular
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

// Component decorator
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
// Class definition for the component
export class AddProductPage {

  // Properties to hold product information
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productPrice: number;

  // Constructor with dependency injection for ProductService and Router
  constructor(private productService: ProductService, private router: Router) {
  }

  // Method to add a new product
  addProduct() {
    // Create a new product object with input values and a generated ID
    const newProduct = {
      id: this.generateProductId(),
      userId: 1,  // Assuming a static user ID for demonstration purposes
      name: this.productName,
      description: this.productDescription,
      imageUrl: this.productImageUrl,
      price: this.productPrice,
    };

    // Log the new product to the console
    console.log(newProduct);

    // Call the addProduct method from the ProductService
    this.productService.addProduct(newProduct);

    // Reset the form and navigate to the user-product page
    this.resetForm();
    this.router.navigate(['/user-product']);
  }

  // Method to reset the form fields
  resetForm() {
    this.productName = '';
    this.productDescription = '';
    this.productImageUrl = '';
    this.productPrice = null;
  }

  // Private method to generate a random product ID
  private generateProductId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
