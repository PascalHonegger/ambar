import styles from './EmptySearchResults.module.css'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";

interface EmptySearchResultsProps {
  searchQuery: string;
  performSearch: (query: string) => void;
}

export function EmptySearchResults({
  searchQuery,
  performSearch
}: EmptySearchResultsProps) {
  const hasQuery = searchQuery !== '';
  const title = hasQuery ? 'Nothing Found' : 'Few tips for search';
  const description = hasQuery
    ? (<span><i>{searchQuery}</i>&nbsp;-&nbsp;search query, did not match any documents</span>)
    : (<span>Just type your query in search input above and hit "Enter"</span>);
  return (
    <Paper className={styles.emptyCard}>
      <Card>
        <CardHeader
          className={styles.emptyCardTitle}
          title={<span className={styles.emptyCardHeaderTitle}>{title}</span>}
        />
        <CardContent>
          <div>
            <p style={{ marginTop: 0 }}>{description}</p>
            <div><p>Try these tips to refine your search</p>
              <ul>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('*') }}>
                  *
                </span> - show all files
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('John Smith') }}>
                  John Smith
                </span> - search for both "John" and "Smith" words in file content and meta
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('"John Smith"') }}>
                  "John Smith"
                </span> - search for "John Smith" phrase in file content and meta
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('"John Smith"~10') }}>
                  "John Smith"~10
                </span> - search for both "John" and "Smith" words with maximum distance of 10 words in file content and meta
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('John~3') }}>
                  John~3
                </span> - fuzzy search for word "John" in all files with maximum of 3 replacements
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('filename:*.txt') }}>
                  filename:*.txt
                </span> - search for ".txt" in file fullname
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('size>1M') }}>
                  size&gt;1M
                </span> - search for all files larger than 1 MB (options: M for MegaBytes, K for KiloBytes)
                </li>
                <li><span className={styles.clickableSpan} onClick={() => { performSearch('when:today') }}>
                  when:today
                </span> - search for all files modified today (options: today, yesterday, thisweek, thismonth, thisyear)
                </li>
                <li>
                  <span className={styles.clickableSpan} onClick={() => { performSearch('author:*') }}>
                    author:*
                  </span> - search only in file author field
                </li>
                <li>
                  <span className={styles.clickableSpan} onClick={() => { performSearch('tags:ocr,ui-upload') }}>
                    tags:ocr,ui-upload
                  </span> - search for files tagged with ocr and ui-upload tag
                </li>
                <li>
                  <span className={styles.clickableSpan} onClick={() => { performSearch('show:removed') }}>
                    show:removed
                  </span> - search in removed files (options: removed, all)
                </li>
              </ul>
            </div>
            <p>
              Have any questions?&nbsp;<a className={styles.link} href='mailto:hello@ambar.cloud'>Drop us a message</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </Paper>
  )
}
