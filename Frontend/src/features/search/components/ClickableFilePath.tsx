import { HitMeta } from '../model';
import styles from './ClickableFilePath.module.css'

interface ClickableFilePathProps {
  meta: HitMeta;
  performSearch: (query: string) => void;
}

export function ClickableFilePath({
  meta,
  performSearch
}: ClickableFilePathProps) {
  const fullPath = meta.full_name;

  const fullPathParts = fullPath.split('/').filter(part => part !== '');
  const fullPathPartsExtended = fullPathParts
    .map((part, idx) => {
      const isLast = idx === fullPathParts.length - 1
      const trailingSymbol = isLast ? '' : '/'
      const trailingAsterisk = '*'

      return {
        part: `${part}${trailingSymbol}`,
        pathToPart: `//${fullPathParts.filter((part, innerIdx) => innerIdx <= idx).join('/')}${trailingAsterisk}`
      }
    });

  const isHighlighted = meta.highlight && meta.highlight.full_name;

  return (
    <div>
      <div className={isHighlighted ? styles.metaFullNameLineContainerHighlighted : styles.metaFullNameLineContainer}>
        <span>//</span>
        {fullPathPartsExtended.map((part, idx) => <span
          className={styles.metaFullNamePart}
          key={idx}
          onClick={() => performSearch(part.pathToPart)}>
          {part.part}
        </span>)}
      </div>
    </div>
  );
}
