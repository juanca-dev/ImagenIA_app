import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
 
import { Posts } from 'src/assets/data/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Post[] = []
  loading: boolean = false;

  constructor(
    private utilsSvc: UtilsService,
    private postsSvc: PostsService
    ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPosts()
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.getPosts();

      event.target.complete();
    }, 2000);
  }

  getPosts() {
    this.loading = true;
       this.postsSvc.getPosts().subscribe({
        next: (res: any) => {
          console.log(res);
          this.posts = res.data;
          this.loading = false;
        }, error: (error: any) =>{
          console.log(error);
          this.loading = false;
        }
       })
    
     } 

 
    async showPostDetail(post: Post){

      await this.utilsSvc.presentModal({
        component: PostDetailComponent,
        componentProps: { post},
        cssClass: 'modal-full-size'
      })

  }
}

  

 
