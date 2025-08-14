import { Component, Inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Import Swiper core and required modules
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

export interface WorkCarouselData {
  title: string;
  images: string[];
}

@Component({
  selector: 'app-work-carousel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './work-carousel-dialog.component.html',
  styleUrls: ['./work-carousel-dialog.component.scss']
})
export class WorkCarouselDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WorkCarouselDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkCarouselData
  ) {}

  ngOnInit(): void {
    // Initialize Swiper if needed
  }

  close(): void {
    this.dialogRef.close();
  }
}
