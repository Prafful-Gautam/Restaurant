import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
interface FoodType {
  food_id: number;
  name: string;
  restaurant_id: number;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
private apiUrl = 'http://localhost:3000/insert/';
private updatedFood = new Subject<FoodType[]>();
private foods: FoodType[];
  constructor(private http: HttpClient) { }

  addFood(name: string, restaurantId: number, imageFile: File){
    console.log('-----', name, restaurantId, imageFile);
    const postData = new FormData();
    postData.append("name", name);
    postData.append("restaurant_id", restaurantId.toString());
    postData.append("image", imageFile);
    console.log('--->', postData.getAll('name'));
    return this.http.post(`${this.apiUrl}add-food`, postData).subscribe(res => console.log(res));
  }

  getFoods(restId: number){
    return this.http.get<FoodType[]>(`${this.apiUrl}food?restId=${restId}`)
      .subscribe(res => {
        this.foods = res;
        console.log(this.foods);
        this.updatedFood.next([...this.foods]);

      });
  }
getFoodUpdateListner(){
  return this.updatedFood.asObservable();
}

  deleteFood(foodId: number){
    return this.http.delete(`${this.apiUrl}food?food_id=${foodId}`).subscribe(res => {
      const foodUpdate = this.foods.filter(res => {res.food_id !== foodId});
      this.foods = foodUpdate;
      this.updatedFood.next([...this.foods]);
    });
  }
}
