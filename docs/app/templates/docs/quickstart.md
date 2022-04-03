# Quickstart

To get started the `<MobileMenuWrapper/>` component needs to be placed high in the dom so that it wraps the entirety of your app's content on which the gestures need to be detected. From this component you can then yield a content, toggle and menu component to which you can pass a block of content. An extended `<LinkTo/>` component is available which closes the menu on click. The content component should wrap your pages content. It will react to gestures and adjust its styles as needed.

```handlebars
<MobileMenuWrapper as |mmw|>
  <mmw.MobileMenu as |mm|>
    <mm.LinkTo @route="index">Home</mm.LinkTo>
  </mmw.MobileMenu>

  <mmw.Content>
    <mmw.Toggle>Menu</mmw.Toggle>
  </mmw.Content>
</MobileMenuWrapper>
```
