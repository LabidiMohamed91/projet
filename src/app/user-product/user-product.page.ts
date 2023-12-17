// Import necessary modules from Angular
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

// Component decorator
@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.page.html',
  styleUrls: ['./user-product.page.scss'],
})
// Class definition for the component implementing OnInit and OnChanges interfaces
export class UserProductPage implements OnChanges {

  // Properties to hold product and user information
  products: any[]; // Array to store all products
  filteredProducts: any[]; // Array to store filtered products based on search
  authenticatedUser: any; // Object to store information about the authenticated user

  // Constructor with dependency injection for ProductService, AuthService, and AlertController
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private alertController: AlertController,
  ) {
    // Get information about the authenticated user
    this.authenticatedUser = this.authService.getAuthenticatedUser();

    // Subscribe to the products observable in the ProductService
    this.productService.products$.subscribe(products => {
      // Update the products array and the filteredProducts array based on the user ID
      this.products = productService.getProductsByUserId(this.authenticatedUser.id);
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

  // Method to handle the deletion of a product
  async deleteProduct(productId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Do nothing if the user cancels the deletion
          }
        },
        {
          text: 'Delete',
          handler: () => {
            // Call the performDelete method to handle the actual deletion
            this.performDelete(productId);
          }
        }
      ]
    });

    // Present the alert to the user
    await alert.present();
  }

  // Private method to handle the actual deletion of a product
  private performDelete(productId: number) {
    // Attempt to delete the product using the ProductService
    const deletedProduct = this.productService.deleteProduct(productId);

    // Check if the deletion was successful
    if (deletedProduct) {
      // Update the filteredProducts array to remove the deleted product
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
    } else {
      // Log an error message if the product was not found or deletion failed
      console.error(`Product with ID ${productId} not found or deletion failed.`);
    }
  }

  // Method to handle the editing of a product
  async editProduct(product: any) {
    const alert = await this.alertController.create({
      header: 'Edit Product',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: product.name,
          placeholder: 'Product Name'
        },
        {
          name: 'description',
          type: 'text',
          value: product.description,
          placeholder: 'Product Description'
        },
        {
          name: 'imageUrl',
          type: 'url',
          value: product.imageUrl,
          placeholder: 'Product Image URL'
        },
        {
          name: 'price',
          type: 'number',
          value: product.price,
          placeholder: 'Price'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Do nothing if the user cancels the edit
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            // Call the updateProduct method to handle the actual update
            this.updateProduct(product.id, data);
          }
        }
      ]
    });

    // Present the alert to the user
    await alert.present();
  }

  // Private method to handle the actual update of a product
  private updateProduct(productId: number, updatedData: any) {
    // Attempt to update the product using the ProductService
    const updatedProduct = this.productService.updateProduct(productId, updatedData);

    // Check if the update was successful
    if (updatedProduct) {
      // Update the filteredProducts array to reflect the changes
      this.filteredProducts = this.filteredProducts.map(product => {
        return product.id === productId ? updatedProduct : product;
      });
    } else {
      // Log an error message if the product was not found or update failed
      console.error(`Product with ID ${productId} not found or update failed.`);
    }
  }

  // Lifecycle hook called when the component detects changes
  ngOnChanges(changes: SimpleChanges): void {
    // Log changes for demonstration purposes
    console.log(changes);
  }
}
