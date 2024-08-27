import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { ReviewComponent } from './review/review.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    TeacherComponent,
    CourseComponent,
    ReviewComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'edu-platform';

  barsIcon?: HTMLElement | null;
  navbar?: HTMLElement | null;
  header?: HTMLElement | null;
  sections?: NodeListOf<HTMLElement>;
  navLinks?: NodeListOf<HTMLElement>;

  ngOnInit() {
    this.barsIcon = document.querySelector('.fa-bars');
    this.navbar = document.querySelector('.navbar');
    this.header = document.querySelector('header');
    this.sections = document.querySelectorAll('section');
    this.navLinks = document.querySelectorAll('.navbar ul li a');

    if (this.barsIcon) {
      this.barsIcon.addEventListener('click', this.toggleNavbar.bind(this));
    }
  }

  @HostListener('window:scroll', [])
  @HostListener('window:load', [])
  handleScroll() {
    const top = window.scrollY;

    if (this.header) {
      if (top > 30) {
        this.header.classList.add('header-active');
      } else {
        this.header.classList.remove('header-active');
      }
    }

    this.sections!.forEach((section) => {
      const id = section.getAttribute('id');
      const height = section.offsetHeight;
      const offset = section.offsetTop - 200;

      if (top >= offset && top < offset + height) {
        this.navLinks!.forEach((link) => {
          link.classList.remove('active');
        });
        const activeLink = this.navbar?.querySelector(`[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  toggleNavbar() {
    if (this.barsIcon && this.navbar) {
      this.barsIcon.classList.toggle('fa-times');
      this.navbar.classList.toggle('nav-toggle');
    }
  }
}
