import Avatar from '@mui/material/Avatar';
import { HitMeta } from '../model';
import { getExtension } from '../util';
import styles from './FileAvatar.module.css'

interface FileAvatarProps {
  meta: HitMeta;
  performSearch: (query: string) => void;
}

const getHashCode = (str: string): number => {
  let hash = 0;

  if (str.length === 0) {
    return hash
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }

  return hash
}

export function FileAvatar({
  meta,
  performSearch
}: FileAvatarProps) {
  const colors = [
    '#EF5350', '#E53935', '#D81B60', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#2196F3', '#43A047', '#EF6C00', '#A1887F', '#78909C', '#FF4081', '#3949AB']

  const extension = getExtension(meta)

  return (
    <Avatar
      className={styles.resultAvatar}
      onClick={() => performSearch(`*.${extension}`)}
      style={{
        fontSize: '12px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        backgroundColor: colors[getHashCode(extension) % colors.length],
        width: 38,
        height: 38
      }}
      >{extension}</Avatar>
  )
}
