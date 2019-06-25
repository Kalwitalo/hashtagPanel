import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Post} from '../model/Post';

@Injectable()
export class PostService {
  private static MAX_SEARCH_COUNTER = 10;

  constructor(private http: HttpClient) {
  }

  getPostsByHtags(htags: string[]): Observable<Post> {
    const posts = new Subject<Post>();
    for (let i = 0; i < htags.length; i++) {
      this.getPostsForHtag(htags[i], posts, i === htags.length - 1);
    }
    return posts.asObservable();
  }

  private getPostsForHtag(htag: string, posts: Subject<Post>, isLastHtag, next_cursor?: string, counter: number = 0) {
    const urlForHtags = this.getUrlForHtags(htag, next_cursor);
    this.http.get(urlForHtags).subscribe(data => {
      this.extractPostInfo(htag, data, posts, counter, isLastHtag);
    });
  }

  private extractPostInfo(htag: string, data: object, posts: Subject<Post>, counter: number, isLastHtag: boolean) {

    const media = data['graphql']['hashtag']['edge_hashtag_to_media'];
    const edges = media['edges'];
    for (const edge of edges) {
      const p = Post.formInstaHtagEdge(htag, edge['node']);
      posts.next(p);
    }

    const pageInfo = data['graphql']['hashtag']['edge_hashtag_to_media']['page_info'];
    const hasNext = pageInfo['has_next_page'];
    let end_cursor;
    const shouldContinue = hasNext && counter < PostService.MAX_SEARCH_COUNTER;
    if (shouldContinue) {
      end_cursor = pageInfo['end_cursor'];
      setTimeout(() => this.getPostsForHtag(htag, posts, isLastHtag, end_cursor, counter + 1), 400);
    } else {
      if (isLastHtag) {
        posts.complete();
      }
    }
  }

  private getUrlForHtags(htag: string, next_cursor?: string): string {
    let ret = `https://www.instagram.com/explore/tags/${htag}/?__a=1`;
    if (next_cursor) {
      ret += `&max_id=${next_cursor}`;
    }
    return ret;
  }
}
