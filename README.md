### Setup

```
npm install
```

### Run

```
npm run dev
```

### Upload script.js

```
npm run kv:upload
```

Which essentially runs:
`wrangler kv:key put --binding=REACT_SSR "script.js" ./build/worker.js --path`

### TODO:

- Performance & SEO benchmark
- Figure out how to fetch and render server side
- Improve/stabilise build
- Make React build produce a script.js, it should not expose server script
- Fix getAssetFromKV
- The server project then inherits the React project
- Caching
- S3 for images?
- Add smart routing
