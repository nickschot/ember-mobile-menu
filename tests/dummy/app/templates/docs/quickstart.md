# Quickstart

To get started the `{{mobile-menu-wrapper}}` component, which detects the gestures, needs to be placed high in the dom so that it wraps the entirety of your app's content on which the gestures need to be detected. From this component you can then yield a toggle and menu component to which you can pass a block of content. An extended `{{link-to}}` component is available which closes the menu on click.

```handlebars
{{#mobile-menu-wrapper as |mmw|}}
  {{#mmw.toggle}}Menu{{/mmw.toggle}}

  {{#mmw.mobile-menu as |mm|}}
    {{#mm.LinkTo 'index'}}Home{{/mm.LinkTo}}
  {{/mmw.mobile-menu}}
{{/mobile-menu-wrapper}}
```
