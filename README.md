# ⚡ Utilities to super-charge your ES Modules!

## Utils
1) [CSS loader](#css-loader)
2) More upcoming



## CSS loader
You can use the `CSS loader` to load css in your ES Modules.

### Usage
In your html file add the following script(where `assetsRoot` is the path from which you css is served from) and import map:
```html
<html>
    <head>
        ...
        <script>
            window.__importMapUtils = {
                css: {
                    assetsRoot: '/assets/'
                }
            };
        </script>
        <script type="importmap">
            {
                "imports": {
                    "import-map-utils/": "https://cdn.jsdelivr.net/npm/@subbu963/import-map-utils@0.1.3/lib/"
                }
            }
        </script>
        ...
    </head>
    ...
</html>
```
Then in your ES Module import your css files like this:
```javascript
import styles from 'import-map-utils/css/loader.js?src=./main.css';

// Some code
```

### Options
You can pass options like this:
```html
<script>
    window.__importMapUtils = {
        css: {
            useLocation: true, // to use window.location to construct the base
            base: 'https://some-site.com/', // or pass the base manually
            assetsRoot: '/assets/' // root assets folder from which your css is served from
        }
    };
</script>
```