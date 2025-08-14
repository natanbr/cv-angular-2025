import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { StaggerChildrenDirective } from '../../directives/stagger-children.directive';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkCarouselDialogComponent } from '../work-carousel/work-carousel-dialog.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    StaggerChildrenDirective,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss', '../../styles/animations.scss']
})
export class ExperienceComponent {
  // Placeholder images for each job (replace with actual images when available)
  private jobImages = [
      './assets/screenshots/ark_scam.png',
      './assets/screenshots/me-graph.png',
  ];

  constructor(private dialog: MatDialog) {}

  openWorkCarousel(jobKey: string, jobTitle: string): void {
    this.dialog.open(WorkCarouselDialogComponent, {
      width: '90%',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'work-carousel-dialog',
      data: {
        title: jobTitle,
        images: this.jobImages
      }
    });
  }
}
