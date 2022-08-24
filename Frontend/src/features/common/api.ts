const apiHost = process.env.NODE_ENV ? 'http://webapi:8080/' : 'http://localhost:8080/';

export const webApiSearchByStringQuery = (query: string, page: number, size: number) => `${apiHost}/api/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`;
export const webApiLoadContentHightlight = (fileId: string, query: string) => `${apiHost}/api/search/${fileId}/?query=${encodeURIComponent(query)}`;
export const webApiLoadFullContentHightlight = (fileId: string, query: string) => `${apiHost}/api/search/${fileId}/full?query=${encodeURIComponent(query)}`;
export const webApiGetFile = (fullPath: string) => `${apiHost}/api/files/download?path=${encodeURIComponent(fullPath)}`;
export const webApiGetFileText = (metaId: string) => `${apiHost}/api/files/${metaId}/text`;

export const webApiGetLogs = (recordsCount: number) => `${apiHost}/api/logs/?recordsCount=${recordsCount}`;

export const webApiGetStats = () => `${apiHost}/api/stats`;
export const webApiGetInfo = () => `${apiHost}/api/`;
export const webApiPostFile = (fileName: string) => `${apiHost}/api/files/uiupload/${fileName}`;
export const webApiGetThumbnail = (sha: string) => `${apiHost}/api/thumbs/${sha}`;

export const webApiAddTagToFile = (fileId: string, tagType: string, tagName: string) => `${apiHost}/api/tags/${fileId}/${tagType}/${tagName}`;
export const webApiDeleteTagFromFile = (fileId: string, tagType: string, tagName: string) => `${apiHost}/api/tags/${fileId}/${tagType}/${tagName}`;
export const webApiGetAllTags = () => `${apiHost}/api/tags`;

export const webApiHideFile = (fileId: string) => `${apiHost}/api/files/hide/${fileId}`;
export const webApiUnhideFile = (fileId: string) => `${apiHost}/api/files/unhide/${fileId}`;

export const webApiSearchTree = (query: string) => `${apiHost}/api/search/tree?query=${query}`;
export const webApiSearchStats = (query: string) => `${apiHost}/api/search/stats?query=${query}`;

export const defaultSettings: RequestInit = {
  mode: 'cors',
  credentials: 'include',
  cache: 'no-cache',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
}