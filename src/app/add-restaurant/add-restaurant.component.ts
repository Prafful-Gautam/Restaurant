import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { RestaurantService } from './service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {
restaurantForm: FormGroup;
states: Observable<any>;
  constructor(private fb: FormBuilder, private restService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.states = this.restService.getStates();

  }

  onSubmit(){
    if(this.restaurantForm.invalid){
      return;
    }
    console.log(this.restaurantForm.value)
    this.restService.addRestaurant(this.restaurantForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/restaurant-list']);
    }, error => console.log(error));
  }

}
