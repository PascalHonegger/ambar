import { useEffect, useState, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectSearchView } from '../searchSlice';

export function SearchResults() {
  const searchView = useAppSelector(selectSearchView);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO dispatch(search(0, query))
  });

  switch (searchView) {
    case 'table':
      return <TableView />
    case 'folder':
      return <FolderView />
    case 'detailed':
      return <DetailedView />
    case 'statistics':
      return <StatisticsView />
  }
}
