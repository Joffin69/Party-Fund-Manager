import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { mimeType } from './mime-type.validator';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  imagePreview = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      title: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        asyncValidators: [mimeType]
      }),
      content: new FormControl(null, {}),
      isAdmin: new FormControl(null, {})
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.isAdmin) {
      this.form.value.isAdmin = 'false';
    }
    this.authService.signUp(
      this.form.value.name,
      this.form.value.password,
      this.form.value.title,
      this.form.value.image,
      this.form.value.content,
      this.form.value.isAdmin);
  }
}
