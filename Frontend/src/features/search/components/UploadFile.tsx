import FileIcon from '@mui/icons-material/Attachment'
import UploadIcon from '@mui/icons-material/CloudUpload'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dropzone from 'react-dropzone'
import { useState } from 'react';

interface UploadFileProps {
  open: boolean;
  fetching: boolean;
  uploadFiles: (files: File[]) => void;
  closeModal: () => void;
}

export function UploadFile({
  open,
  fetching,
  closeModal,
  uploadFiles
}: UploadFileProps) {
  const [files, setFiles] = useState<File[]>([])

  const addFiles = (filesToUpload: File[]) => setFiles([...files, ...filesToUpload]);
  const removeFile = (file: File) => setFiles(files.filter(f => f !== file));

  const upload = () => {
    uploadFiles(files);
    setFiles([]);
  }

  const cancel = () => {
    closeModal();
    setFiles([]);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <div>
          <Dropzone
            onDrop={addFiles}
            maxSize={100 * 1024 * 1024}
            multiple={true}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()} style={{
                width: '100%',
                height: '150px',
                borderWidth: '2px',
                borderColor: isDragActive ? '#00BCD4' : '#BDBDBD',
                borderStyle: 'dashed',
                borderRadius: '5px',
                backgroundColor: '#E0E0E0'
              }}>
                {!fetching && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <UploadIcon style={{ display: 'flex', flexGrow: 2, color: '#00BCD4', width: '100%', opacity: 0.25 }} />
                  <input {...getInputProps()} />
                  <div style={{ marginBottom: '5px' }}>Drop some files here</div>
                </div>}
                {fetching && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress size={80} thickness={5} />
                </div>}
              </div>
            )
            }
          </Dropzone>
          {files.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {files.map((file, idx) =>
              <Chip
                key={idx}
                label={file.name}
                variant="outlined"
                avatar={<Avatar color="#444" ><FileIcon /></Avatar>}
                style={{ margin: '2px' }}
                onDelete={() => {
                  if (!fetching)
                    removeFile(file)
                }} />
            )
            }
          </div>
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={fetching}
          onClick={cancel}
        >Cancel</Button>,
        <Button
          variant="contained"
          color="secondary"
          disabled={fetching || files.length === 0}
          onClick={upload}
        >Upload</Button>
      </DialogActions>
    </Dialog>)
}
