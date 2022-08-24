import styles from './ImagePreview.module.css'

interface ImagePreviewProps {
  imageUrl: string;
  hide: () => void;
}

export function ImagePreview({
  imageUrl,
  hide
}: ImagePreviewProps) {
  return (
    <div className={styles.imagePreviewOverlayDiv} onClick={hide}>
      <img className={styles.imagePreview} alt='' src={imageUrl} />
    </div>
  )
}
