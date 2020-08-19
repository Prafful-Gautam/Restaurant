import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { RestType } from '../restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
apiUrl = 'http://localhost:3000/insert/';
  constructor(private http: HttpClient) { }

  getStates(): Observable<any>{
    return this.http.get<{states}>('states.json').pipe(map(res => {
      return res.states;
    }));
  }

 addRestaurant(rest: RestType): Observable<RestType>{
    return this.http.post<RestType>(`${this.apiUrl}add-restaurant`, rest);
  }

  getRestaurants(){
    return this.http.get<{name: string, type: string}>('http://localhost:3000/insert/get-restaurants');
  }
  getRestaurant(id){
    return this.http.get<{restaurantId: number, city_id: number, name: string, type: string}>(`http://localhost:3000/insert/get-restaurant?restId=${id}`)
      .pipe(map(res => res[0]));
  }

  getRestaurantByCity(city: string){
    return this.http.get<{cityId: number}>(`${this.apiUrl}restaurantbycity?cname=${city}`);
  }

  getCity(id: number){
    console.log('cityID', id);
    return this.http.get<{name: string}>(`${this.apiUrl}city?cityId=${id}`);
  }
}
