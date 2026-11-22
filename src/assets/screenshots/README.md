Project media lives in src/assets/projects/ as CDN pointers (.asset.json).
Add new media with: lovable-assets create --file <file> --filename <name> > src/assets/projects/<name>.asset.json
Then import the pointer in src/data/projects.js and add it to the project's
`screenshots` ({ src: x.url, alt }), `videos` ({ src: x.url, title }) or `files` ({ href: x.url, label, note }).
