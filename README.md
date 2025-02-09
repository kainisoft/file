The simple file to load test is named: `upload.sh`

## Steps to install locally (development environment with HMR)
1. Clone this repo
2. Run command `docker compose up -d --build`
3. Open browser page `http://localhost:4200` (the design is super simple).
4. Click on `Upload file`
5. The result as a `gif` file you will see a little bit lower.

## Steps to install to production environment
1. Clone this repo
2. Build `client` and `server` images: `cd client && docker build -t kainisoft/client .`, `cd server && docker build -t kainisoft/server .`
3. Run command `docker compose -f docker-compose.production.yml up -d --build`

Of course, this is not a perfect solution, it is better to use pipelines and a private docker hub repo

## Proxy server that behavior as CDN and API gateway
This proxy has been created to solve the issue with unlimited requests to the server. Under the hood, the third-party service `traefik` is used. Steps to try it out:
1. Clone this repo
2. Run command `docker compose -f docker-compose.proxy.yml up -d --build`
3. As result two endpoint will be available: `server.local:4000` and `client.local:4200`

 
