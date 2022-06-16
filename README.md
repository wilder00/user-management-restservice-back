## RUN

to run this serve:
`node app.js`
if you prefer using nodemon:
`nodemon app.js`
but you will need to install it on your global package
`npm install -g nodemon`

## CREATING A RELEASE TAG

```
git tag -a v1.0.0 -m "a simple rest server"
git push --tags
```

## Package:

- express
- cors
- sequalize orm for database: [doc](https://sequelize.org/docs/v6/getting-started/)
- express-validator : para hacer validaciones como correos
- jsonwebtoken : para generar token