import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonReponse, SERVER_API_BASE_URL, User } from 'src/shared/model/sharedModels';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<CommonReponse> {
    return this.http.get<CommonReponse>(SERVER_API_BASE_URL+"/users");
  }

  getPaginatedUsers(page:number, limit:number): Observable<CommonReponse> {
    return this.http.get<CommonReponse>(SERVER_API_BASE_URL+"/users?page="+page+"&limit="+limit);
  }

  updateUser(user: User, userId: string) : Observable<CommonReponse>{
    return this.http.put<CommonReponse>(SERVER_API_BASE_URL+"/users/"+userId,user);
  }

  deleteUser(userId: string) : Observable<CommonReponse> {
    return this.http.delete<CommonReponse>(SERVER_API_BASE_URL+"/users/"+userId);
  }

  addUser(user: User) : Observable<CommonReponse> {
    return this.http.post<CommonReponse>(SERVER_API_BASE_URL+"/users",user);
  }
}
