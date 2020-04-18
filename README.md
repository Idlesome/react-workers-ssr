### Upload script.js

```
npm run kv:upload
```

`wrangler kv:key put --binding=REACT_SSR "script.js" ./build/worker.js --path`

#### Serverless

To deploy using serverless add a [`serverless.yml`](https://serverless.com/framework/docs/providers/cloudflare/) file.
