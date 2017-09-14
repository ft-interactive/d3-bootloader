# @Financial-Times/d3-bootloader

This users SystemJS to bootstrap and load a D3-based project. You can use modern JS because it
transpiles everything on-the-fly.

## Usage:

- Create a `.html` file containing the following code:

```html
  <script src="//unpkg.com/@financial-times/d3-bootloader" async></script>
```

- Next, create a file called `index.js` in the same directory as the above:

```js
import * as d3 from 'd3'; // Import the whole thing...
import {scaleLinear} from 'd3-scale'; // ...Or just bits and pieces, it doesn't matter.

export default async function () {
  return await Promise.resolve('Yep you can use ES2017 here too');
}
```

Voilà! The above module will run upon page load. Note this *only* works with D3, and a few of the
sundry `ft-interactive` modules.

- This also exposes a UMD global named `bootD3` that returns a promise containing the resolved
`index.js` module. That means you can then do something like:

```html
<script>
  bootD3.then((index) => {
    index().then(alert);
  });
</script>
```

...Which, given the above `index.js` module, will alert with "Yep you can use ES2017 here too".

### What if I need more modules?

It's not like you can include this on page and then add any module in the npmjs.org registry. If you
want to add another module (that's deliverable via a CDN like unpkg), add the following *before*
your d3-bootloader script tag:

```js
<script>
  window.D3_BOOTLOADER_MODULES = {
    'd3-jetpack': 'https://unpkg.com/d3-jetpack@2',
  }
</script>
```

Each key in the `map` object is what you'll import, and the value is a CDN resource exporting some
kind of UMD module.

For more info, please see the [SystemJS Configuration API Docs][2].

### Should this be used in production?

**Oh hells nawww** — on-the-fly Babel transpilation isn't exactly the lightest thing ever.

Not only that, but every module you load from `index.js` will create a separate request.

This project is mainly intended to help streamline the creation of examples for [ft-interactive/visual-vocabulary-templates][1]. Again, *you probably don't want to use this in production.*

[1]: https://github.com/ft-interactive/visual-vocabulary-templates
[2]: https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
