import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

function CounterButton() {
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <button
        onClick={() => {
          console.log('button clicked')
          setCounter(counter + 1)
        }}
      >
        Counter {counter}
      </button>
    </div>
  )
}

const header = `<!DOCTYPE html>
<html lang="en">
  <title>React SSR CloudFlare Workers Example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <body>
    <div id="app">`

const footer = `</div>
<script src="/script.js" type="text/javascript"></script>
</body>
</html>`

const routes = {
  '/': <CounterButton />,
}

async function handleRequest(event) {
  // Render component
  const url = new URL(event.request.url)
  if (url.pathname in routes) {
    const component = routes[url.pathname]

    let rendered = ReactDOMServer.renderToString(component)
    return new Response(header + rendered + footer, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }

  // console.log(REACT_SSR)
  // let options = {
  //   ASSET_NAMESPACE: REACT_SSR,
  // }
  // Send asset
  try {
    const script = await REACT_SSR.get('script.js')
    return new Response(script, {
      headers: {
        'Content-Type': 'text/javascript',
      },
    })
  } catch (e) {
    console.log(e)
    // // if an error is thrown try to serve the asset at 404.html
    // if (!DEBUG) {
    //   try {
    //     let notFoundResponse = await getAssetFromKV(event, {
    //       mapRequestToAsset: req =>
    //         new Request(`${new URL(req.url).origin}/404.html`, req),
    //     })

    //     return new Response(notFoundResponse.body, {
    //       ...notFoundResponse,
    //       status: 404,
    //     })
    //   } catch (e) {}
    // }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

if (typeof navigator !== 'undefined') {
  console.log('hydrating')
  window.addEventListener('load', function() {
    console.log(CounterButton)
    const app = document.querySelector('#app')
    ReactDOM.hydrate(<CounterButton />, app)
  })
}
