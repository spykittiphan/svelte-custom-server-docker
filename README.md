## Getting Started

First, add server.js:

```bash
import { handler } from './build/handler.js';
import express from 'express';
import fs from 'fs';
import https from 'https';

var privateKey = fs.readFileSync('cert/localhost.key');
var certificate = fs.readFileSync('cert/localhost.crt');
var credentials = { key: privateKey, cert: certificate };

const app = express();

var serverSSL = https.createServer(credentials, app);

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);


serverSSL.listen(3333, () => {
    console.log('listening on port 3333');
});
```

Step 2: update file svelte.config.js

```bash
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter({
            out: 'build',
            precompress: false,
            envPrefix: '',
            polyfill: true
        })
    }
};

export default config;
```

Step 3: install package fs https express, run command

```bash
npm install fs https express
```

Step 4: run shell script file

```bash
sh deploy.sh
sh run.sh
```

Finished, application will start on : https://127.0.0.1:4010/

can generate new localhost certificate file :
```bash
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```


You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
