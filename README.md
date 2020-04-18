# Setup

```
npm install
```

# Run

```
npm run dev
```

### Upload script.js

```
npm run kv:upload
```

Which essentially runs:
`wrangler kv:key put --binding=REACT_SSR "script.js" ./build/worker.js --path`
