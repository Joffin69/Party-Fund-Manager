import { Component } from '@angular/core';

@Component({
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  user = {
    name: "Joffin",
    title: "Senior Systems Engineer",
    content: "I am a simple man !!",
  };
}
