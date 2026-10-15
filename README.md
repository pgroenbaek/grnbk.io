# grnbk.io

[![Astro v7.3.8](https://img.shields.io/badge/Astro-v7.3.8-7724E3?logo=astro&logoColor=ffffff)](https://astro.build/)
[![License GNU GPL v3](https://img.shields.io/badge/License-%20%20GNU%20GPL%20v3%20-lightgrey?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj4KICA8IS0tIEZvbnQgQXdlc29tZSBGcmVlIDYuNy4yIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPgogIDxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMzg0IDMybDEyOCAwYzE3LjcgMCAzMiAxNC4zIDMyIDMycy0xNC4zIDMyLTMyIDMyTDM5OC40IDk2Yy01LjIgMjUuOC0yMi45IDQ3LjEtNDYuNCA1Ny4zTDM1MiA0NDhsMTYwIDBjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJsLTE5MiAwLTE5MiAwYy0xNy43IDAtMzItMTQuMy0zMi0zMnMxNC4zLTMyIDMyLTMybDE2MCAwIDAtMjk0LjdjLTIzLjUtMTAuMy00MS4yLTMxLjYtNDYuNC01Ny4zTDEyOCA5NmMtMTcuNyAwLTMyLTE0LjMtMzItMzJzMTQuMy0zMiAzMi0zMmwxMjggMGMxNC42LTE5LjQgMzcuOC0zMiA2NC0zMnM0OS40IDEyLjYgNjQgMzJ6bTU1LjYgMjg4bDE0NC45IDBMNTEyIDE5NS44IDQzOS42IDMyMHpNNTEyIDQxNmMtNjIuOSAwLTExNS4yLTM0LTEyNi03OC45Yy0yLjYtMTEgMS0yMi4zIDYuNy0zMi4xbDk1LjItMTYzLjJjNS04LjYgMTQuMi0xMy44IDI0LjEtMTMuOHMxOS4xIDUuMyAyNC4xIDEzLjhsOTUuMiAxNjMuMmM1LjcgOS44IDkuMyAyMS4xIDYuNyAzMi4xQzYyNy4yIDM4MiA1NzQuOSA0MTYgNTEyIDQxNnpNMTI2LjggMTk1LjhMNTQuNCAzMjBsMTQ0LjkgMEwxMjYuOCAxOTUuOHpNLjkgMzM3LjFjLTIuNi0xMSAxLTIyLjMgNi43LTMyLjFsOTUuMi0xNjMuMmM1LTguNiAxNC4yLTEzLjggMjQuMS0xMy44czE5LjEgNS4zIDI0LjEgMTMuOGw5NS4yIDE2My4yYzUuNyA5LjggOS4zIDIxLjEgNi43IDMyLjFDMjQyIDM4MiAxODkuNyA0MTYgMTI2LjggNDE2UzExLjcgMzgyIC45IDMzNy4xeiIvPgo8L3N2Zz4=&logoColor=%23ffffff)](/LICENSE)

My personal developer blog and portfolio built with Astro and React.

## Configuration

To configure the site, copy the contents of `.env.template` and rename it as e.g. `.env.local`, `.env.development`, or `.env.production`.

You can then fill out the values and save the file. These .env files are used for configuring the static site built by Astro.

```dotenv
# This is a template file.
# To use, fill out the values and save the file as e.g. .env.local, .env.development, or .env.production.

# Domain name
DOMAIN=

# Url of the Statusdot API (https://github.com/pgroenbaek/statusdot-api)
STATUSDOT_API_URL=

# Identity
ENABLE_KEYBASE_PROOF=false
ENABLE_PGP_PUBLIC_KEY=false
ENABLE_WKD=false
```

The `DOMAIN` variable is the domain name of the site.

The `STATUSDOT_API_URL` variable is the URL of the [Statusdot API](https://github.com/pgroenbaek/statusdot-api), which is a tiny API for managing your online status and presence that can be hosted on CloudFlare Workers.

The identity variables enable copying files from the [identity](/identity) folder of the repo into the built site's `.well-known` path. If false, the files will not be copied and not be present in the built site's `.well-known` path.

These files are my keybase DNS proof, as well as my public PGP key and its Web Key Directory (WKD) configuration. Make sure to replace the file contents with your own stuff if you do decide to use this functionality, the files contained in the repo are specific to me.

## Building

To install the prequisites, you need to have Node.js and npm installed on your system. You can download them from the [official Node.js website](https://nodejs.org/) and [npm website](https://www.npmjs.com/).

Once you have Node.js and npm installed, you can install Astro and React by running the following command in your terminal:

```bash
npm install
```

To start the development server, you can run the following command in your terminal:

```bash
npm run dev
```

To build the project for production and preview the built site:

```bash
npm run build
npm run preview
```

## Deploying

This project is set up to deploy the built `dist` directory to CloudFlare Pages using `wrangler`.

> [!IMPORTANT]
> If you decide to use this project as a template for your own website, then make sure to remove all my content beforehand.
> Make the site your own before deploying it anywhere.

You can deploy the project by running the following command in your terminal:

```bash
echo '<DOMAIN_NAME>' > dist/CNAME && wrangler pages deploy dist --project-name=<CLOUDFLARE_PAGES_PROJECT_NAME>
```

Or use the shorthand defined in `package.json` (change the command to your own project/domain name before using):

```bash
npm run deploy
```

## License

The source code of this project is licensed under the [GNU General Public License v3.0 (GPL-3.0)](https://www.gnu.org/licenses/gpl-3.0.html). You are free to use, modify, and distribute the code under the terms of this license. See the [LICENSE](/LICENSE) file for the full license text.

**Copyright © 2026 Peter Grønbæk Andersen.** All rights reserved for original blog content, including articles, text, photographs, and other creative works, unless otherwise stated. Such content is not covered by the software license and may not be reproduced or redistributed without permission.

### Third-Party Assets

This project includes third-party logos, icons, and other assets representing programming languages, frameworks, and technologies. These assets remain the property of their respective owners and are subject to their respective licenses and trademark policies.

Unless otherwise stated, third-party assets are not covered by this project's GNU General Public License v3.0. Their inclusion does not imply endorsement by their respective owners.


