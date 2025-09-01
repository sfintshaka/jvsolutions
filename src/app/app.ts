import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('jv-solutions');
  isMobileMenuOpen = false;
  
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Here you would typically send the data to a backend service
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.formData = {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    };
  }
}
