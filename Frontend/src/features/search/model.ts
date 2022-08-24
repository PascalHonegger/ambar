export interface StatsData {
  total: number;
  summary: {
    data: Array<{
      extension: string;
      hits_percent: number;
      hits_count: number;
      size: number;
    }>;
  };
  tags: {
    total: number;
    data: Array<{
      name: string;
      type: string;
      hits_percent: number;
      hits_count: number;
    }>;
  };
}

export interface TreeNode {
  path: string;
  name: string;
  type: string;
  childNodes: TreeNode[];
  hitsCount: number;
  isExpanded: boolean;
  depth: number;
  parentPath: string;
  thumbAvailable: boolean;
  contentType: string;
  sha256: string;
  fileId: string;
}


export interface HitsModel {
  clean: boolean;
  hits: Map<string, Hit>;
  found: number;
  searchQuery: string;
  hasMore: boolean;
  currentPage: number;
}

export interface HitContent {
  processed_datetime: string;
  size: number;
  state: string;
  title: string;
  language: string;
  type: string;
  author: string;
  length: number;
  text: string;
  thumb_available: boolean;
  ocr_performed: boolean;
  highlight: Record<string, number>;
}

export interface HitMeta {
  id: string;
  full_name: string;
  full_name_parts: string[];
  short_name: string;
  extension: string | string[];
  extra: Record<string, unknown>;
  source_id: string;
  created_datetime: string;
  updated_datetime: string;
  download_uri: string;
  highlight: Record<keyof HitMeta, number>;
}

export interface Hit {
  score: number;
  type: string;
  tags: Tag[];
  content: HitContent;
  meta: HitMeta;
  sha256: string;
  hidden: boolean;
  file_id: string;
  indexed_datetime: string;
  fetching: boolean;
}

export interface Tag {
  type: string;
  name: string;
  isFetching?: boolean;
}
