import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HeaderComponent } from './header/header.component'
import { PostDetailComponent } from './post-detail/post-detail.component'

@NgModule({
  declarations: [HeaderComponent, PostDetailComponent],
  exports: [ReactiveFormsModule, HeaderComponent, PostDetailComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
