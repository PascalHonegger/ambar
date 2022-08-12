import axios from 'axios'
import config from '../config.js'
import { createReadStream } from 'streamifier'
import combinedStream from 'combined-stream2'

const ENC_UTF8 = 'utf-8'
const ES_FILE_INDEX_NAME = "ambar_file_data"
const ES_FILE_TYPE_NAME = "ambar_file"

const bodyToStream = (body, contentToken, data) => {
    const stringifiedBody = JSON.stringify(body)
    const start = stringifiedBody.indexOf(contentToken)

    const prefix = stringifiedBody.substring(0, start - 1)
    const suffix = stringifiedBody.substring(start + contentToken.length + 1)

    const contentRequestStream = combinedStream.create()
    const dataStream = createReadStream(data)

    contentRequestStream.append(Buffer.from(prefix, ENC_UTF8))
    contentRequestStream.append(dataStream)
    contentRequestStream.append(Buffer.from(suffix, ENC_UTF8))

    return contentRequestStream
}

/**
 * Low level update by query implementation to bypass large JSON files problem 
 */
export const updateFile = (fileId, data) => {
    const contentToken = '@content'

    const body = {
        doc: contentToken,
        doc_as_upsert: true
    }

    const bodyStream = bodyToStream(body, contentToken, data)

    return new Promise((resolve, reject) => {
        axios.post(`${config.elasticSearchUrl}/${ES_FILE_INDEX_NAME}/${ES_FILE_TYPE_NAME}/${fileId}/_update?retry_on_conflict=5&refresh=true`, bodyStream, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            const response = resp.data
            
            if (response.result === 'updated' || response.result === 'created') {
                resolve(response.result)
            } else {
                reject(response)
            }
        }
        ).catch((err) => reject(err))
    })
}