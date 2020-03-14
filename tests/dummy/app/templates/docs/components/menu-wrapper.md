# Mobile Menu Wrapper
This component manages the state of the menus and does the initial pan recognition. It is the main entry point for using this addon.

By default it is set up to detect a pan from respectively the left or the right edge depending on the chosen menu(s).

```handlebars
<MobileMenuWrapper as |mmw|>
  <mmw.Toggle>Menu</mmw.Toggle>

  <mmw.MobileMenu as |mm|>
    <mm.LinkTo @route="index">Home</mm.LinkTo>
  </mmw.MobileMenu>
</MobileMenuWrapper>
```

## Left & Right menus
By default the menu is setup to be a left menu. By passing `type=right` to the menu you can make the menu slide in from the right. A `target` option is available on the toggle component to target a specific menu (defaults to `left`).

```handlebars
<MobileMenuWrapper as |mmw|>
  <mmw.Toggle @target="right">Menu</mmw.Toggle>

  <mmw.MobileMenu @type="right" as |mm|>
    <mm.LinkTo @route="index">Home</mm.LinkTo>
  </mmw.MobileMenu>
</MobileMenuWrapper>
```

## Multiple menus
You can also use both a left and a right menu.

```handlebars
<MobileMenuWrapper as |mmw|>
  <mmw.Toggle @target="left">Left Menu</mmw.Toggle>
  <mmw.Toggle @target="right">Right Menu</mmw.Toggle>
  
  <mmw.MobileMenu @type="left" as |mm|>
    <mm.LinkTo @route="index">Home</mm.LinkTo>
  </mmw.MobileMenu>

  <mmw.MobileMenu @type="right" as |mm|>
    <mm.LinkTo @route="index">Home</mm.LinkTo>
  </mmw.MobileMenu>
</MobileMenuWrapper>
```

## Embedded menu
The menu can also be used embedded on a page by passing `embed=true` to the `{{mobile-menu-wrapper}}` component. This means the menus will stay within the boundaries of the `<MobileMenuWrapper/>` component.

{{#docs-demo as |demo|}}
  {{#demo.example name="menu-quickstart.hbs" class="demo-height" }}
    <MobileMenuWrapper @embed={{true}} as |mmw|>
      <mmw.Toggle>Menu</mmw.Toggle>
      
      <mmw.MobileMenu as |mm|>
        <mm.LinkTo @route="index">Home</mm.LinkTo>
      </mmw.MobileMenu>
    </MobileMenuWrapper>
  {{/demo.example}}

  {{demo.snippet 'menu-quickstart.hbs'}}
{{/docs-demo}}
