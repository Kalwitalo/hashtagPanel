export class Post {
  hashtags: Array<string>;
  id: string;
  shortcode: string;
  display_url: string;
  likes: number;
  owner_id: number;
  comments: number;
  caption: string;
  display_resources: string;
  taken_at_timestamp: number;
  hashtag: string;
  thumbnail_src: string;

  constructor() {
    this.hashtags = new Array();
  }

  public static fromInstaShortcodeMedia(htag, json): Post {
    const p = new Post();
    const node = json['graphql']['shortcode_media'];
    p.id = node.id;
    p.shortcode = node.shortcode;
    p.display_url = node.display_url;
    p.display_resources = node.display_resources;
    p.taken_at_timestamp = node.taken_at_timestamp;
    p.hashtag = htag;
    return p;
  }

  public static formInstaHtagEdge(htag, node): Post {
    let p = new Post();
    p.id = node.id;
    p.shortcode = node.shortcode;
    p.display_url = node.display_url;
    p.taken_at_timestamp = node.taken_at_timestamp;
    p.thumbnail_src = node.thumbnail_src;
    try {
      p.caption = node['edge_media_to_caption']['edges'][0]['node']['text'];
      p.hashtags = this.extractHashTag(p.caption);
    } catch (e) {
    }
    p.hashtag = htag;
    return p;
  }

  private static extractHashTag(string): Array<string> {
    const reg = /(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
    const tags = new Array<string>();
    let match;
    while (match = reg.exec(string)) {
      tags.push(match[1]);
    }
    return tags;
  }
}
