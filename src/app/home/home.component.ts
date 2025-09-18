import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BlogComponent } from '../components/blog/blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    BlogComponent,
    ExperienceComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
