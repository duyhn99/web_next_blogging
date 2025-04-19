export interface IPosts {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: any;
  featured_image: any;
  author_id: any;
  category_id: any;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface IPostDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: any;
  featured_image: any;
  author_id: any;
  category_id: any;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}
