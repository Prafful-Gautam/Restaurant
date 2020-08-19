import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../add-restaurant/service/restaurant.service';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
restaurant: Observable<any>;
city: Observable<any>;
show = true;
  constructor(private restService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
   this.restaurant = this.restService.getRestaurants();
   this.city = this.restService.getStates();
  }

  view(id: number, cityId: number){
    console.log(cityId);
    this.router.navigate(['/restaurant-details'], {queryParams: {restId: id, cityId: cityId}});
  }

  addFood(id: number){
    this.router.navigate(['/add-food'], {queryParams: {restId: id}});
  }

  getRestaurants(city){
    console.log(city.value);
    if (city.value === 'all'){
      this.restaurant = this.restService.getRestaurants();

    } else{
        this.restaurant = this.restService.getRestaurantByCity(city.value);
      }

  }
  }


