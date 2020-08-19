import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../add-restaurant/service/restaurant.service';
import { FoodService } from '../foods/food.service';
import { Subscription, Observable } from 'rxjs';

interface RestaurantType{
  restaurant_id: number;
  city_id: number;
  name: string;
  type: string;
}
interface FoodType{
  food_id: number;
  name: string;
  restaurant_id: number;
  imagePath: string;
}

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
private rest = {restId: null, cityId: null};
restaurant: RestaurantType;
city: string;
food: FoodType[] = [];
foodData: Observable<any>;
  constructor(private active: ActivatedRoute, private restService: RestaurantService, private foodService: FoodService) { }

  ngOnInit(): void {
    this.active.queryParams.subscribe(data => {
      console.log('query params -->', data);
      this.rest = {restId: data.restId, cityId: data.cityId};

    });
    this.restService.getRestaurant(this.rest.restId).subscribe(data => {
      this.restaurant = data;
      console.log(this.restaurant);
    });

    this.restService.getCity(this.rest.cityId).subscribe(data => {console.log(data);
      this.city = data.name;
    });

    this.foodService.getFoods(this.rest.restId);

    this.foodService.getFoodUpdateListner().subscribe((data: FoodType[]) => {
      this.food = data;
    });
  }

  remove(foodId: number){
    console.log(foodId);
    this.foodService.deleteFood(foodId);
  }


}
