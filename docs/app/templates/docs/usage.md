# Usage
## Installation
From your application directory run: 

```sh
ember install ember-mobile-menu
```

**NOTE:** the minimum supported Ember version is v3.28.

## Styles
The addon will automatically import its required CSS. CSS variables are available for customization:

### Layout Variables
```css
:root {
    /* Wrapper dimensions */
    --mobile-menu-wrapper-width: 100%;
    --mobile-menu-wrapper-min-height: 100vh;
    
    /* Menu dimensions and layering */
    --mobile-menu-height: 100vh;
    --mobile-menu-z-index: 2000;
}
```

### Animation Variables
```css
:root {
    /* Spring animation timing and duration */
    --mobile-menu-spring-timing: cubic-bezier(0.2, 0.9, 0.22, 1); /* Fallback */
    --mobile-menu-spring-timing: linear(...); /* Wobble spring physics curve */
    --mobile-menu-spring-duration: 506ms;
}
```

An optional `android` theme is also available for the sidebar (it's used in this documentation). This can be imported in your app with ember-auto-import. This can also be `app.js`.

```javascript
import 'ember-mobile-menu/themes/android'
```

### Android Theme Variables
The android theme provides these CSS variables for customization:

```css
  :root {
    --mobile-menu-header-bg:                 #E04E39;

    --mobile-menu-item-color:                #333;
    --mobile-menu-item-active-bg:            #EEE;
    --mobile-menu-item-link-disabled-color:  #6C757D;
  }
```
