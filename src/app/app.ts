import { Component, signal, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('jv-solutions');
  isMobileMenuOpen = false;
  currentSection = 'home';
  
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.updateTitle('home');
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
  }

  private setupScrollListener() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.addEventListener('scroll', () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = this.document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (this.currentSection !== section) {
              this.currentSection = section;
              this.updateTitle(section);
            }
            break;
          }
        }
      }
    });
  }

  private updateTitle(section: string) {
    const titles: { [key: string]: string } = {
      'home': 'J & V Solutions - Your Needs Come First',
      'services': 'Our Services - J & V Solutions',
      'about': 'About Us - J & V Solutions', 
      'contact': 'Contact Us - J & V Solutions'
    };
    
    this.document.title = titles[section] || titles['home'];
  }

  scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMobileMenu();
    }
  }

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
