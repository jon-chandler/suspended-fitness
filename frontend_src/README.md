## SUSPENDED FITNESS


After cloning the repo' (develop branch) you will need to `cd %your preoject/%frontend_src && npm -i`
<br /><br />

### Watch

```
npm run watch
```

Compiles `frontend_src` `scss` and `js` files with sourcemaps to `js` and `css` in `public`. Recompiles on file changes
<br /><br />

### Dev Build
```
npm run dev
```

Compiles a development version to `public`. Content is not obfuscated or minified and contains sourcemaps. 
<br /><br />



### Production Build

```
npm run build
```

Will compile/transpile/minify the `js` and `scss` files, removing any existing public sourcemaps before copying everything to `public`. Any assets referenced in the SCSS will be pushed to the `compiled_assets` directory 