import { environment } from './../../environments/environment';
import { IFbCreateResponse, IPost } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})

export class PostsService {

  constructor(
    private http: HttpClient
  ) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe( map( (res: IFbCreateResponse) => {
        return {
          ...post,
          id: res.name,
          date: new Date(post.date)
        }
      } ) )
  }
}