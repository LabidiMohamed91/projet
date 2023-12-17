// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

// Component decorator
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
// Class definition for the component implementing OnInit interface
export class ProductDetailsPage implements OnInit {

  // Properties to hold product information
  productId: number; // Product ID obtained from the route parameters
  product: any; // Object to store product details

  // Constructor with dependency injection for ActivatedRoute and ProductService
  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Get the product ID from the route parameters
    this.productId = +this.route.snapshot.paramMap.get('id');

    // Get the product details using the ProductService based on the product ID
    this.product = this.productService.getProductById(this.productId);
  }

}
