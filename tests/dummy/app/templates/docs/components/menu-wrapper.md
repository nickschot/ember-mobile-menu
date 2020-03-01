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

## Embedded menu
The menu can also be used embedded on a page by passing `embed=true` to the `{{mobile-menu-wrapper}}` component.

{{#docs-demo as |demo|}}
  {{#demo.example name="menu-quickstart.hbs" class="demo-height" }}
    {{#mobile-menu-wrapper embed=true as |mmw|}}
      {{#mmw.toggle}}Menu{{/mmw.toggle}}
    
      {{#mmw.mobile-menu as |mm|}}
        {{#mm.link-to "index"}}Home{{/mm.link-to}}
      {{/mmw.mobile-menu}}
    {{/mobile-menu-wrapper}}
  {{/demo.example}}

  {{demo.snippet 'menu-quickstart.hbs'}}
{{/docs-demo}}
