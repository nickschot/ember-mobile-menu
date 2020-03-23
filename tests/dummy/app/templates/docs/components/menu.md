# Mobile Menu
This component is yielded from `mobile-menu-wrapper`. It represents a menu instance.

## Modes
A menu component takes an `@mode` argument which represents how it will function.

| Mode             | Primary use case      | Description                                                                 | 
| ---------------- | --------------------- | --------------------------------------------------------------------------- |
| `default`        | mobile, small screens | Default overlay menu.                                                       |
| `push`           | mobile                | Pushes the content.                                                         |
| `reveal`         | mobile                | Content is dragged away, revealing the menu.                                |
| `ios`            | mobile                | Similar to `reveal` but the menu has 1/3 the translation of the user's pan. |
| `squeeze`        | tablet, desktop       | A push style menu which squeezes the content keeping everything in view.    |
| `squeeze-reveal` | tablet, desktop       | Similar to `squeeze` but with a `reveal` style menu.                        |

If you have two menu instances `left` and `right` they can have distinct modes.

## Shadow
The `@shadowEnabled` argument enables or disables a dynamic shadow, which gets stronger as the menu is opened, for menu's which "overlay" the content. These are `default`, `squeeze` and `push` modes. For the other modes this argument will apply a fixed shadow to the `Content` component.

## Mask
The `@maskEnabled` argument enables or disables a mask which will overlay the content. By default it's opacity is linked to the current progress of the pan. The background color of the mask can be set through CSS. Clicking the mask will close the menu.

## Menu width
The width of the menu can be controller by two arguments: `@width` and `@maxWidth`. `@width` is as a percentage of the width of the `<MobileMenuWrapper/>` component. `@maxWidth` is a maximum width passed in as pixels. It can be set to -1 to disable the maximum width. This can be used to for example create a full width iOS style menu.
