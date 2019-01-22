ember-mobile-menu
==============================================================================

[![Build Status](https://travis-ci.org/nickschot/ember-mobile-menu.svg?branch=master)](https://travis-ci.org/nickschot/ember-mobile-menu) [![Ember Observer Score](https://emberobserver.com/badges/ember-mobile-menu.svg)](https://emberobserver.com/addons/ember-mobile-menu)

An [ember-cli](http://www.ember-cli.com) addon providing a draggable sidebar specifically tailored to mobile devices.

Both a left and a right menu are supported. Dragging is supported through touch events as supported by any modern (mobile) browser. The sidebar provides an empty canvas suitable for any content. An optional Android theme is supplied.

*Please note this is a pre-alpha release. Breaking changes will very likely still happen*

Requirements
------------------------------------------------------------------------------
This addon currently requires `ember-cli-sass` to be used in the main application. Support for pre-compiled CSS will be added at a later time.

Installation
------------------------------------------------------------------------------

From your application directory run: 

`ember install ember-mobile-menu`

The addon will automatically add the necessary SCSS import to your `app.scss`.

Usage
------------------------------------------------------------------------------
This addon consists of several components. The main `mobile-menu-wrapper` component is obligatory.

### `mobile-menu-wrapper`
The `mobile-menu-wrapper` component manages the state of the menu's and does the initial pan recognition. By default it is set up to detect a pan from respectively the left or the right edge depending on the chosen menu(s).

#### Parameters
 * `openDetectionWidth` (number) - width in `px` of the edge from where a pan can be started. Defaults to 15.

#### Actions
Several actions to control menu state are yielded in the `actions` hash.

 * `toggle` - toggle the given menu. Takes either `left` or `right`.
 * `close` - close the given menu. Takes either `left` or `right`.

### `mobile-menu`
This component is yielded from `mobile-menu-wrapper`. It represents a menu instance.

#### Parameters
 * `type`            'left', side of the screen the menu is on. Takes either `left` or `right`.
 * `width`           85, width in `vw`.
 * `maxWidth`        300, maximum width of the menu in pixels.
 * `maskEnabled`     true, whether or not the mask (with close action) is enabled.
 * `triggerVelocity` 0.3, the velocity needed to open the menu with a flick.
 
#### Actions
Several actions to control menu state are yielded in the `actions` hash.

 * `close` - Closes the menu.

#### Hooks
Several hooks are available for when menu state changes. You can pass an action `onOpen=(action 'someAction')` which is called when the hook is triggered.

 * `onOpen` - Triggered after the menu was opened
 * `onClose` - Triggered after the menu was closed
 
### `link-to`
The `mobile-menu` component yields a modified link-to component which closes the menu on transition. See the Ember documentation help with the `link-to` component.
 
Example
------------------------------------------------------------------------------

```handlebars
{{#mobile-menu-wrapper as |mmw|}}
  <button {{action mmw.actions.toggle 'left'}}>Toggle left menu</button>

  {{outlet}}

  {{#mmw.mobile-menu as |mm|}}
    {{#mm.link-to 'index'}}Home{{/mm.link-to}}
  {{/mmw.mobile-menu}}
  
  {{#mmw.mobile-menu type='right' as |mm|}}
      {{#mm.link-to 'index'}}Home{{/mm.link-to}}
  {{/mmw.mobile-menu}}
{{/mobile-menu-wrapper}}
```

Themes
------------------------------------------------------------------------------
An optional Android-like theme is supplied. Include it by adding `@import 'ember-mobile-menu/themes/android` in your `app.scss`.

### Example
TBD. A header is also supported, but not fully worked out yet.
```handlebars
{{#mmw.mobile-menu as |mm|}}
  <div class="mobile-menu__body">
    <ul class="mobile-menu__nav">
      <li class="mobile-menu__nav-item">
        {{#mm.link-to 'index' class='mobile-menu__nav-link'}}Home{{/mm.link-to}}
      </li>
      <li class="mobile-menu__nav-divider"></li>
      <li class="mobile-menu__nav-item">
        {{#mm.link-to 'contact' class='mobile-menu__nav-link'}}Contact{{/mm.link-to}}
      </li>
    </ul>
  </div>
{{/mmw.mobile-menu}}
```

Copyright and license
------------------------------------------------------------------------------

Code and documentation copyright 2018 Nick Schot. The code is released under [the MIT license](LICENSE.md).
