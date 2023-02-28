import { Component, Input, OnInit } from '@angular/core'
import { Platform } from '@ionic/angular'
import { error } from 'console'
import { Post } from 'src/app/models/post.model'
import { PostsService } from 'src/app/services/posts.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  @Input() post!: Post
  @Input() isNew!: boolean

  selectedImage: string = ''

  constructor(
    public platform: Platform,
    private utilsSvc: UtilsService,
    private postsSvc: PostsService
  ) {}

  ngOnInit() {
    this.selectedImage = this.post.images[0];
  }

  submit() {
    let userPosts: Post[] =
    this.utilsSvc.getElementFromLocalstorage('userPosts') || [];
    this.utilsSvc.presentLoading({ message: 'Publicando...'})  
    this.postsSvc.createPost(this.post).subscribe({
      next: (res: any) => {
        userPosts.push(res.post)
        this.utilsSvc.setElementInLocalstorage('userPosts', userPosts);
        this.utilsSvc.routerLink('/home')
        this.utilsSvc.dismissModal()

        this.utilsSvc.dismissLoading();
      },
      error: (error: any) => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error,
          color: 'danger',
          duration: 1500,
          icon: 'alert-cicle-outline'
        })
        this.utilsSvc.dismissLoading();
      }
    })
  }

  saveImage() {
    if (this.platform.is('capacitor')) {
      this.utilsSvc.shareImageInMobile(this.selectedImage)
    } else {
      this.utilsSvc.saveImageInWeb(this.selectedImage)
    }
  }

  copyPromptToClipboard() {
    this.utilsSvc.copyToClipboard(this.post.prompt)
    this.utilsSvc.presentToast({
      message: 'Copiado a portapapeles',
      icon: 'clipboard-outline',
      duration: 1000,
      color: 'primary',
    })
  }
}
