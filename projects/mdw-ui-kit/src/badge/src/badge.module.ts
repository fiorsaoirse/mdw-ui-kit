import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdBadgeComponent } from './components/badge.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [MdBadgeComponent],
  exports: [MdBadgeComponent],
})
export class MdBadgeModule {}
