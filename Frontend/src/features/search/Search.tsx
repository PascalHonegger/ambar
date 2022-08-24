import { useEffect, useState, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectQuery, setTags } from './searchSlice';
import { loadTags, uploadFile } from './searchAPI';
import { UploadFile } from './components/UploadFile'
import { ImagePreview } from './components/ImagePreview'
import { handleError, selectIsLoading, showInfo, startLoadingIndicator, stopLoadingIndicator } from '../common/commonSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fab from '@mui/material/Fab';
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import { SearchResults } from './container/SearchResults';

export function Search() {
  const query = useAppSelector(selectQuery);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const [scrolledDown, setScrolledDown] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const containerNode = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const loadAndSetTags = () => {
    dispatch(startLoadingIndicator());
    loadTags().then(tags => {
      dispatch(setTags(tags));
      dispatch(stopLoadingIndicator());
    })
      .catch((errorPayload) => {
        dispatch(handleError(errorPayload));
      })
  }

  const uploadFiles = (filesToUpload: File[]) => {
    dispatch(startLoadingIndicator())

    const uploadPromises = filesToUpload.map(file => uploadFile(file))

    Promise.all(uploadPromises)
      .then(() => {
        setShowUploadDialog(false);
        dispatch(stopLoadingIndicator())
        dispatch(showInfo({ message: 'Files succesfully uploaded' }))
      })
      .catch((error) => {
        if (error.status === 507) {
          dispatch(handleError({ error: 'No free space left in your account', showErrorMessage: true }))
        } else {
          dispatch(handleError(error))
        }

        console.error('uploadFile', error)
      })
  }

  useEffect(() => {
    document.title = `Search`;

    loadAndSetTags()
  });

  return (
    <div style={{ height: '100%' }}>
      {isDesktop &&
        <div style={{
          position: 'fixed',
          width: '200px',
          height: '100%',
          left: 0,
          right: 0,
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
          padding: '0'
        }}>
          <SideMenu
            performSearchByQuery={performSearchByQuery}
            performSearchBySize={performSearchBySize}
            performSearchByWhen={performSearchByWhen}
            performSearchByShow={performSearchByShow}
            performSearchByTag={performSearchByTag}
            toggleUploadModal={toggleUploadModal}
            setSearchResultView={setSearchResultView}
            searchView={searchView}
            allTags={allTags}
          />
        </div>
      }
      <div style={{ marginLeft: isDesktop ? '200px' : '0', height: '100%', overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.05)' }}
        ref={containerNode}>
        <SearchResults />
        {containerNode && <InfiniteScroll
          anchorEl={containerNode}
          currentPage={currentPage}
          threshold={100}
          loadMore={(newPage) => {
            search(newPage, searchQuery)
          }}
          hasMore={hasMore}
          onScrollDown={(isFirstPage) => setScrolledDown(!isFirstPage)}
        />}
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', bottom: '10%', right: '30px', zIndex: '990' }}>
          <Fab
            onClick={() => {
              if (containerNode.current)
                containerNode.current.scrollTop = 0
            }}
            className={scrolledDown ? '' : 'hiddenWithAnimation'}>
            <ArrowUpward />
          </Fab>
        </div>
      </div>
      <UploadFile open={showUploadDialog} uploadFiles={uploadFiles} closeModal={() => setShowUploadDialog(false)} fetching={isLoading} />
      {previewUrl && <ImagePreview imageUrl={previewUrl} hide={() => setPreviewUrl(null)} />}
    </div>
  );
}
