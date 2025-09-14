import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {
  contactForm: FormGroup;
  showSuccessPopup = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Show success popup
      this.showSuccessPopup = true;
      
      // Reset form
      this.contactForm.reset();
      
      // Hide popup after 3 seconds
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 3000);
    }
  }

  closePopup() {
    this.showSuccessPopup = false;
  }
}
