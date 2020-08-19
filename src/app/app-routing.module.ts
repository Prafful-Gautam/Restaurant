import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddRestaurantComponent} from './add-restaurant/add-restaurant.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { AddFoodComponent } from './foods/add-food/add-food.component';

const routes: Routes = [
  {path: '', component: AddRestaurantComponent},
  {path: 'restaurant-list', component: RestaurantListComponent},
  {path: 'restaurant-details', component: RestaurantDetailsComponent},
  {path: 'add-food', component: AddFoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
