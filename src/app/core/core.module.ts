import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarComponent } from './components/menubar/menubar.component';

@NgModule({
  declarations: [MenubarComponent],
  imports: [CommonModule],
  exports: [MenubarComponent],
})
export class CoreModule {}
