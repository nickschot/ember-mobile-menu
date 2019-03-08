# Mobile Menu Wrapper
This component manages the state of the menus and does the initial pan recognition. It is the main entry point for using this addon.

By default it is set up to detect a pan from respectively the left or the right edge depending on the chosen menu(s).

```handlebars
{{#mobile-menu-wrapper as |mmw|}}
  {{#mmw.toggle}}Menu{{/mmw.toggle}}

  {{#mmw.mobile-menu as |mm|}}
    {{#mm.link-to 'index'}}Home{{/mm.link-to}}
  {{/mmw.mobile-menu}}
  
  {{#mmw.mobile-menu type='right' as |mm|}}
      {{#mm.link-to 'index'}}Home{{/mm.link-to}}
    {{/mmw.mobile-menu}}
{{/mobile-menu-wrapper}}
```
