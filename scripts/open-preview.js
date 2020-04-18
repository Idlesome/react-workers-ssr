const fs = require('fs')
const util = require('util')
const fetch = require('node-fetch')
const readFile = util.promisify(fs.readFile)
const opn = require('opn')

async function newWorker(script) {
  try {
    let resp = await fetch('https://cloudflareworkers.com/script', {
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'text/javascript',
      },
      body: script,
    })

    console.log(resp)

    let data = await resp.json()

    return data.id
  } catch (e) {
    console.log(e)
  }
}

readFile('dist/worker.js', 'utf8')
  .then(data => {
    newWorker(data)
      .then(id =>
        opn('https://cloudflareworkers.com/#' + id + ':https://reactjs.org', {
          app: 'chromium',
        }),
      )
      .catch(e => {
        console.log(e)
      })
  })
  .catch(e => {
    console.log(e)
  })
