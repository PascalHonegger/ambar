import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Hit } from "../model"
import { EmptySearchResults } from "./EmptySearchResults";
import { FileAvatar } from "./FileAvatar";
import { ClickableFilePath } from "./ClickableFilePath";
import { FileSizeLabel } from "./FileSizeLabel";
import { formatFileSize } from "../util";

interface TableViewProps {
  hits: Hit[];
  searchQuery: string;
  performSearch: (query: string) => void;
}

export function TableView({
  hits,
  searchQuery,
  performSearch
}: TableViewProps) {
  if (!searchQuery || !hits || hits.length === 0) {
    return <EmptySearchResults searchQuery={searchQuery} performSearch={performSearch} />
  }

  return (
    <Table bodyStyle={{ overflow: 'visible', marginBottom: '200px' }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: '60px', paddingLeft: '15px', paddingRight: '5px' }}></TableCell>
          <TableCell style={{ width: '35%' }}>File Name</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Last modified</TableCell>
          <TableCell style={{ width: '220px' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody style={{ marginBottom: '100px' }}>
        {hits.map(({
          fetching,
          meta,
          content,
          sha256,
          tags,
          file_id,
          hidden
        }) =>

          <TableRow>
            <TableCell style={{ width: '60px', paddingLeft: '15px', paddingRight: '5px' }}>
              <FileAvatar meta={meta} performSearch={performSearch} />
            </TableCell>
            <TableCell title={meta.full_name} style={{ width: '35%', whiteSpace: 'normal', wordWrap: 'break-word' }}>
              <b>{meta.short_name}</b>
              <ClickableFilePath meta={meta} performSearch={performSearch} />
            </TableCell>
            <TableCell title={formatFileSize(content.size)}><FileSizeLabel content={content} searchQuery={searchQuery} /></TableCell>
            <TableCell style={{ overflow: 'visible' }} >
              <TagsInput
                tags={tags}
                onAddTag={(tagType, tagName) => addTagToFile(file_id, tagType, tagName)}
                onRemoveTag={(tagType, tagName) => removeTagFromFile(file_id, tagType, tagName)}
                performSearchByTag={performSearchByTag}
                suggestions={allTags.map(t => t.name)}
              />
            </TableCell>
            <TableCell title={content.author}><AuthorLabel content={content} performSearchByAuthor={performSearchByAuthor} /></TableCell>
            <TableCell title={getFormattedTime(meta.updated_datetime)}>
              <UpdatedDateTimeLabel meta={meta} searchQuery={searchQuery} formatFunc={getFormattedTime} />
            </TableCell>
            <TableCell style={{ width: '220px' }}>
              {!hidden && meta.source_id !== 'ui-upload' && !meta.extra.from_container && <IconButton onClick={() => { window.open(downloadUri) }}
                title={localization.searchPage.downloadDescriptionLabel}>
                <FileDownloadIcon color='#00bcd4' hoverColor='#80deea' />
              </IconButton>}
              <IconButton
                disabled={!(contentHighlight && content.thumb_available)}
                onClick={() => {
                  toggleImagePreview(thumbnailUri)
                }}
                title={localization.searchPage.imagePreviewLabel}>
                <ImagePreviewIcon color='#00bcd4' hoverColor='#80deea' />
              </IconButton>
              {!hidden && <IconButton onClick={() => hideFile(file_id)} title={localization.searchPage.removeLabel}>
                <DeleteIcon color='#00bcd4' hoverColor='#80deea' />
              </IconButton>}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
