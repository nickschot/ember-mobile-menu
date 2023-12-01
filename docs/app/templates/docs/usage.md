# Usage
## Installation
From your application directory run: 

```sh
ember install ember-mobile-menu
```

**NOTE:** the minimum supported Ember version is v3.28.

## Styles
The addon will automatically import its required CSS. Some CSS variables are available for customization, should it be necessary.

```css
:root {
    --mobile-menu-wrapper-width: 100%;
    --mobile-menu-wrapper-min-height: 100vh;

    --mobile-menu-height: 100vh;
    --mobile-menu-z-index: 2000;
}
```

An optional `android` theme is also available for the sidebar (it's used in this documentation). This can be imported in your app with ember-auto-import. This can also be `app.js`.

```javascript
import 'ember-mobile-menu/themes/android'
```

It also has CSS variables available for customization.

```css
  :root {
    --mobile-menu-header-bg:                 #E04E39;

    --mobile-menu-item-color:                #333;
    --mobile-menu-item-active-bg:            #EEE;
    --mobile-menu-item-link-disabled-color:  #6C757D;
  }
```
