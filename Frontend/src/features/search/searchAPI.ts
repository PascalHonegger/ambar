import { defaultSettings, webApiGetAllTags, webApiPostFile } from '../common/api'
import { Tag } from './model';

export const loadTags = async (): Promise<Tag[]> => {
  const resp = await fetch(webApiGetAllTags(), {
    method: 'GET',
    ...defaultSettings
  })
  if (resp.status !== 200) {
    throw resp;
  }
  return resp.json()
}

export const uploadFile = async (file: File): Promise<void> => {
  const form = new FormData()
  form.set(file.name, file, file.name)
  const resp = await fetch(webApiPostFile(file.name), {
    method: 'POST',
    body: form,
    mode: 'cors',
    credentials: 'include'
  })
  if (resp.status >= 400) {
    throw resp
  }
}