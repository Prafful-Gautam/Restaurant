import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {
food: FormGroup;
restId: number;
imagePreview: string;
  constructor(private fb: FormBuilder, private active: ActivatedRoute, private foodService: FoodService) { }

  ngOnInit(): void {
    this.active.queryParams.subscribe(res => {
      console.log(res);
      this.restId = res.restId;
    });
    this.food = this.fb.group({
      name: ['', Validators.required],
      restaurantId: [this.restId, Validators.required],
      image: [null]
    });
  }

  onImagePick(event: Event) {
    const pic = (event.target as HTMLInputElement).files[0];
    this.food.patchValue({ image: pic});
    this.food.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(pic);
  }

  onSubmit(){

    console.log(this.food.value);
    this.foodService.addFood(this.food.value.name, this.food.value.restaurantId, this.food.value.image);
  }
}
