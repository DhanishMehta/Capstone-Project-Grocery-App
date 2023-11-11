import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonReponse, Product, SERVER_API_BASE_URL } from 'src/shared/model/sharedModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(additionalString: string): Observable<CommonReponse> {
    return this.http.get<CommonReponse>(SERVER_API_BASE_URL + '/products'+additionalString);
  }

  getPaginatedProducts(additionalString:string, page: number, limit: number): Observable<CommonReponse> {
    console.log("From Product service : " + SERVER_API_BASE_URL + '/products'+additionalString+'page=' + page + '&limit=' + limit);
    return this.http.get<CommonReponse>(
      SERVER_API_BASE_URL + '/products'+additionalString+'page=' + page + '&limit=' + limit
    );
  }

  updateProduct(product: Product, userId: string): Observable<CommonReponse> {
    return this.http.put<CommonReponse>(
      SERVER_API_BASE_URL + '/products/' + userId,
      product
    );
  }

  deleteProduct(userId: string): Observable<CommonReponse> {
    return this.http.delete<CommonReponse>(
      SERVER_API_BASE_URL + '/products/' + userId
    );
  }

  addProduct(product: Product): Observable<CommonReponse> {
    return this.http.post<CommonReponse>(SERVER_API_BASE_URL + '/products', product);
  }
}
