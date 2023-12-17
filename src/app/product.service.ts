import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = [
    { id: 1, userId: 1, name: 'annonce 1', description: 'Description for Product 1', imageUrl: 'im1.jpg', price: 18.99 },
    { id: 2, userId: 2, name: 'annonce 2', description: 'Description for Product 2', imageUrl: 'im1.jpg', price: 45.55 },
    { id: 3, userId: 1, name: 'annonce 3', description: 'Description for Product 3', imageUrl: 'im1.jpg', price: 77.99 },
    { id: 4, userId: 3, name: 'annonce 4', description: 'Description for Product 4', imageUrl: 'im1.jpg', price: 79.99 },
    { id: 5, userId: 3, name: 'annonce 5', description: 'Description for Product 5', imageUrl: 'im1.jpg', price: 78.99 },
  ];

  private productsSubject = new BehaviorSubject<any[]>([]);
  products$: Observable<any[]> = this.productsSubject.asObservable();

  constructor() {
    this.productsSubject.next([...this.products]);
  }

  getAllProducts(): Observable<any[]> {
    return this.products$;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  getProductsByUserId(userId: number) {
    return this.products.filter(product => product.userId === userId);
  }

  addProduct(newProduct: any) {
    newProduct.id = this.getNextProductId();
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
    return newProduct;
  }

  deleteProduct(productId: number) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];

      this.productsSubject.next([...this.products]);

      return deletedProduct;
    }

    return null;
  }

  updateProduct(productId: number, updatedData: any) {
    const index = this.products.findIndex(product => product.id === productId);

    if (index !== -1) {
      const updatedProduct = { ...this.products[index], ...updatedData };

      this.products[index] = updatedProduct;

      this.productsSubject.next([...this.products]);

      return updatedProduct;
    }

    return null;
  }

  private getNextProductId(): number {
    const maxId = Math.max(...this.products.map(product => product.id), 0);
    return maxId + 1;
  }
}
