import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Hit, HitsModel, StatsData, Tag, TreeNode } from './model';

export type SearchView = 'table' | 'folder' | 'detailed' | 'statistics';

export interface SearchState {
  query: string;
  view: SearchView;
  stats: StatsData | null;
  hits: Map<string, Hit>;
  tags: Tag[],
  folderHits: TreeNode[];
  hasMore: boolean;
  currentPage: number;
}

const initialState: SearchState = {
  query: '',
  view: 'table',
  stats: null,
  hits: new Map(),
  tags: [],
  folderHits: [],
  hasMore: false,
  currentPage: 0,
};

const foldersTreeToMap = (node: TreeNode, map: Map<string, boolean>) => {
  if (!node) {
    return
  }

  map.set(node.path, node.isExpanded)
  node.childNodes.forEach(childNode => foldersTreeToMap(childNode, map))
}

const setNewExpandedValues = (node: TreeNode, map: Map<string, boolean>) => {
  if (!node) {
    return
  }

  node.isExpanded = map.get(node.path) ?? false
  node.childNodes.forEach(childNode => setNewExpandedValues(childNode, map))
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchView: (state, action: PayloadAction<SearchView>) => {
      state.view = action.payload;
    },
    updateQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    fillStatsData: (state, action: PayloadAction<StatsData>) => {
      state.stats = action.payload;
    },
    fillSearchFolderHits: (state, action: PayloadAction<TreeNode[]>) => {
      if (!state.folderHits) {
        return { ...state, folderHits: action.payload }
      }

      const map = new Map()
      state.folderHits.forEach(hit => foldersTreeToMap(hit, map))

      const newHits = action.payload
      newHits.forEach(hit => setNewExpandedValues(hit, map))

      state.folderHits = newHits
    },
    fillHits: (state, action: PayloadAction<HitsModel>) => {
      if (action.payload.clean) {
        state.hits = action.payload.hits
      }
      else {
        state.hits = new Map([...state.hits, ...action.payload.hits])
      }
      state.hasMore = action.payload.hasMore
      state.currentPage = action.payload.currentPage
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    addTag: (state, action: PayloadAction<{ fileId: string, tag: Tag}>) => {
      const hit = state.hits.get(action.payload.fileId)!!;
      hit.tags.push({...action.payload.tag, isFetching: true });
    },
    removeTag: (state, action: PayloadAction<{ fileId: string, tag: Tag}>) => {
      const hit = state.hits.get(action.payload.fileId)!!;
      hit.tags = hit.tags.filter(t => !((t.name === action.payload.tag.name) && (t.type === action.payload.tag.type)))
    },
    markTagsAsCreated: (state, action: PayloadAction<{ fileId: string, tag: Tag}>) => {
      const hit = state.hits.get(action.payload.fileId)!!;
      const tag = hit.tags.find(t => (t.name === action.payload.tag.name) && (t.type === action.payload.tag.type))
      if (tag) {
        tag.isFetching = false;
      }
    }
  }
});

export const { setSearchView, updateQuery, fillStatsData, fillSearchFolderHits, fillHits, setTags, addTag, removeTag, markTagsAsCreated } = searchSlice.actions;

export const selectQuery = (state: RootState) => state.search.query;
export const selectSearchView = (state: RootState) => state.search.view;

export default searchSlice.reducer;
