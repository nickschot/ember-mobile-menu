

## v3.0.0-beta.1 (2022-04-03)

#### :boom: Breaking Change
* [#234](https://github.com/nickschot/ember-mobile-menu/pull/234) Update dependency ember-gesture-modifiers to v3 ([@renovate[bot]](https://github.com/apps/renovate))
* [#235](https://github.com/nickschot/ember-mobile-menu/pull/235) Update dependency ember-on-resize-modifier to v1 ([@renovate[bot]](https://github.com/apps/renovate))
* [#243](https://github.com/nickschot/ember-mobile-menu/pull/243) Drop Ember 3.23 support ([@nickschot](https://github.com/nickschot))
* [#109](https://github.com/nickschot/ember-mobile-menu/pull/109) replace ember-usable with ember-could-get-used-to-this ([@nickschot](https://github.com/nickschot))
* [#155](https://github.com/nickschot/ember-mobile-menu/pull/155) drop support for Ember < 3.23 ([@nickschot](https://github.com/nickschot))
* [#147](https://github.com/nickschot/ember-mobile-menu/pull/147) put splattributes on the Tray instead of the (less useful) wrapper div of the MobileMenu component ([@nickschot](https://github.com/nickschot))
* [#150](https://github.com/nickschot/ember-mobile-menu/pull/150) upgrade to ember-auto-import v2 ([@nickschot](https://github.com/nickschot))
* [#103](https://github.com/nickschot/ember-mobile-menu/pull/103) upgrade to ember-gesture-modifiers v1 & PointerEvents ([@nickschot](https://github.com/nickschot))
* [#136](https://github.com/nickschot/ember-mobile-menu/pull/136) drope node 10 support ([@nickschot](https://github.com/nickschot))
* [#120](https://github.com/nickschot/ember-mobile-menu/pull/120) drop support for ember-concurrency v1 ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#200](https://github.com/nickschot/ember-mobile-menu/pull/200) Prevent open/close from being triggered a huge amount of times when unnecessary ([@nickschot](https://github.com/nickschot))
* [#188](https://github.com/nickschot/ember-mobile-menu/pull/188) fix import path for htmlSafe ([@nickschot](https://github.com/nickschot))
* [#190](https://github.com/nickschot/ember-mobile-menu/pull/190) fix service injection deprecation ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#259](https://github.com/nickschot/ember-mobile-menu/pull/259) Setup release-it ([@nickschot](https://github.com/nickschot))
* [#254](https://github.com/nickschot/ember-mobile-menu/pull/254) Re-enable embroider test-support on CI ([@nickschot](https://github.com/nickschot))
* [#256](https://github.com/nickschot/ember-mobile-menu/pull/256) Convert addon to monorepo ([@nickschot](https://github.com/nickschot))
* [#255](https://github.com/nickschot/ember-mobile-menu/pull/255) Switch to pnpm ([@nickschot](https://github.com/nickschot))
* [#242](https://github.com/nickschot/ember-mobile-menu/pull/242) Temporarily disable Embroider tests in CI ([@nickschot](https://github.com/nickschot))
* [#216](https://github.com/nickschot/ember-mobile-menu/pull/216) add ember-keyboard v7 resolution to fix ember 4+ CI ([@nickschot](https://github.com/nickschot))
* [#210](https://github.com/nickschot/ember-mobile-menu/pull/210) Fix {{hash}} deprecation in tests ([@nickschot](https://github.com/nickschot))
* [#208](https://github.com/nickschot/ember-mobile-menu/pull/208) Add ember-href-to resolution ([@nickschot](https://github.com/nickschot))
* [#209](https://github.com/nickschot/ember-mobile-menu/pull/209) Update github CI to latest ember-cli blueprint ([@nickschot](https://github.com/nickschot))
* [#189](https://github.com/nickschot/ember-mobile-menu/pull/189) update to addon-docs v4 ([@nickschot](https://github.com/nickschot))
* [#152](https://github.com/nickschot/ember-mobile-menu/pull/152) upgrade to ember-cli 3.27 blueprint ([@nickschot](https://github.com/nickschot))
* [#121](https://github.com/nickschot/ember-mobile-menu/pull/121) use ember-concurrency 2 task syntax ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v2.1.1 (2020-12-04)

#### :memo: Documentation
* [#108](https://github.com/nickschot/ember-mobile-menu/pull/108) manually add application wrapper to dummy app as addon docs styles expect it ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.1.0 (2020-12-03)

#### :rocket: Enhancement
* [#102](https://github.com/nickschot/ember-mobile-menu/pull/102) upgrade to ember-cli 3.22 & update dependencies ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#105](https://github.com/nickschot/ember-mobile-menu/pull/105) properly cleanup body-scroll-lock when the tray component is destroyed ([@nickschot](https://github.com/nickschot))
* [#100](https://github.com/nickschot/ember-mobile-menu/pull/100) remove old service re-export (fixes embroider build) ([@johanrd](https://github.com/johanrd))
* [#98](https://github.com/nickschot/ember-mobile-menu/pull/98) fix ember-usable package.json ref (for yarn 2) ([@bartocc](https://github.com/bartocc))

#### :house: Internal
* [#107](https://github.com/nickschot/ember-mobile-menu/pull/107) add ember-data dev dependency ([@nickschot](https://github.com/nickschot))
* [#106](https://github.com/nickschot/ember-mobile-menu/pull/106) Github CI: allow canary tests to fail, remove job dependencies ([@nickschot](https://github.com/nickschot))
* [#104](https://github.com/nickschot/ember-mobile-menu/pull/104) switch to github CI ([@nickschot](https://github.com/nickschot))

#### Committers: 3
- Julien Palmas ([@bartocc](https://github.com/bartocc))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@johanrd](https://github.com/johanrd)


## v2.0.5 (2020-08-26)

#### :bug: Bug Fix
* [#91](https://github.com/nickschot/ember-mobile-menu/pull/91) fix build issue by upgrading to ember-modifier 2.1.0 ([@nickschot](https://github.com/nickschot))

#### :memo: Documentation
* [#93](https://github.com/nickschot/ember-mobile-menu/pull/93) upgrade ember-cli-addon-docs to 0.9.0 ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.4 (2020-08-23)

#### :bug: Bug Fix
* [#92](https://github.com/nickschot/ember-mobile-menu/pull/92) fix horizontal scrollbar appearing in certain situations ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#90](https://github.com/nickschot/ember-mobile-menu/pull/90) upgrade to ember-gesture-modifiers 0.2.0 ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.3 (2020-08-04)

#### :bug: Bug Fix
* [#89](https://github.com/nickschot/ember-mobile-menu/pull/89) don't require @glimmer/{component,tracking} 1.0.1+ ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.2 (2020-08-03)

#### :bug: Bug Fix
* [#86](https://github.com/nickschot/ember-mobile-menu/pull/86) set aria-hidden="true" on closed MobileMenus ([@nickschot](https://github.com/nickschot))
* [#85](https://github.com/nickschot/ember-mobile-menu/pull/85) make squeeze(-reveal) menus listen to the preventScroll argument ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.1 (2020-08-02)

#### :bug: Bug Fix
* [#83](https://github.com/nickschot/ember-mobile-menu/pull/83) hide secondary mask for push style menus ([@nickschot](https://github.com/nickschot))
* [#82](https://github.com/nickschot/ember-mobile-menu/pull/82) hide MobileMenuWrapper overflow & add prevent scroll class as soon as the menu is not closed ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#81](https://github.com/nickschot/ember-mobile-menu/pull/81) tweak spring to iOS configuration ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.0 (2020-08-01)

#### :boom: Breaking Change
* [#75](https://github.com/nickschot/ember-mobile-menu/pull/75) switch to a ResizeObserver based on-resize modifier ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* [#79](https://github.com/nickschot/ember-mobile-menu/pull/79) add isOpen & onToggle arguments to MobileMenu component (w/ Fastboot support) ([@nickschot](https://github.com/nickschot))
* [#74](https://github.com/nickschot/ember-mobile-menu/pull/74) spring physics implementation to replace basic tween ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#78](https://github.com/nickschot/ember-mobile-menu/pull/78) don't prevent body scroll when the menu is in embed mode ([@nickschot](https://github.com/nickschot))
* [#77](https://github.com/nickschot/ember-mobile-menu/pull/77) prevent body scroll as soon as the menu is not closed ([@nickschot](https://github.com/nickschot))
* [#76](https://github.com/nickschot/ember-mobile-menu/pull/76) fix iOS safari menu overflow when browser chrome is visible ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#80](https://github.com/nickschot/ember-mobile-menu/pull/80) upgrade to ember-cli 3.20 & latest dependencies ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.0-beta.4 (2020-03-29)

#### :rocket: Enhancement
* [#68](https://github.com/nickschot/ember-mobile-menu/pull/68) yield absolute position of active menu from MobileMenuWrapper component ([@nickschot](https://github.com/nickschot))
* [#67](https://github.com/nickschot/ember-mobile-menu/pull/67) yield relative position of active menu from MobileMenuWrapper component ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#66](https://github.com/nickschot/ember-mobile-menu/pull/66) remove reliance on ember-useragent for detecting iOS ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.0-beta.3 (2020-03-27)

#### :rocket: Enhancement
* [#64](https://github.com/nickschot/ember-mobile-menu/pull/64) more rigorously prevent body scroll when non-squeeze menus are open ([@nickschot](https://github.com/nickschot))
* [#61](https://github.com/nickschot/ember-mobile-menu/pull/61) add invisible content mask for reveal/ios/push menus ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#62](https://github.com/nickschot/ember-mobile-menu/pull/62) don't close menu when clicking on a link in one of the squeeze modes ([@nickschot](https://github.com/nickschot))
* [#58](https://github.com/nickschot/ember-mobile-menu/pull/58) add missing ember-concurrency dependency ([@nickschot](https://github.com/nickschot))
* [#59](https://github.com/nickschot/ember-mobile-menu/pull/59) fix css not included in host app if ember-cli-sass isn't used ([@nickschot](https://github.com/nickschot))
* [#60](https://github.com/nickschot/ember-mobile-menu/pull/60) fix minor css issues ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.0-beta.2 (2020-03-24)

#### :boom: Breaking Change
* [#57](https://github.com/nickschot/ember-mobile-menu/pull/57) link body scroll behaviour to menu settings & enable preventScroll by default ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#56](https://github.com/nickschot/ember-mobile-menu/pull/56) fix childmenus tracking & registration ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v2.0.0-beta.1 (2020-03-23)

#### :boom: Breaking Change
* [#42](https://github.com/nickschot/ember-mobile-menu/pull/42) implement multiple modes (inc better UX for desktop) ([@nickschot](https://github.com/nickschot))
* [#36](https://github.com/nickschot/ember-mobile-menu/pull/36) set minimum supported version to ember-cli 3.12 + ember-source 3.13 ([@nickschot](https://github.com/nickschot))
* [#32](https://github.com/nickschot/ember-mobile-menu/pull/32) migrate to glimmer components ([@nickschot](https://github.com/nickschot))
* [#31](https://github.com/nickschot/ember-mobile-menu/pull/31) bump minimum node to 10 ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* [#52](https://github.com/nickschot/ember-mobile-menu/pull/52) ignore pan events that start near the edge on non-standalone iOS browsers ([@nickschot](https://github.com/nickschot))
* [#44](https://github.com/nickschot/ember-mobile-menu/pull/44) add support for different mode per menu ([@nickschot](https://github.com/nickschot))
* [#43](https://github.com/nickschot/ember-mobile-menu/pull/43) rework pan handling ([@nickschot](https://github.com/nickschot))
* [#42](https://github.com/nickschot/ember-mobile-menu/pull/42) implement multiple modes (inc better UX for desktop) ([@nickschot](https://github.com/nickschot))
* [#40](https://github.com/nickschot/ember-mobile-menu/pull/40) make maxWidth optional (enables 100% width menus) ([@nickschot](https://github.com/nickschot))
* [#34](https://github.com/nickschot/ember-mobile-menu/pull/34) automatically toggle the only available menu if no target is passed ([@nickschot](https://github.com/nickschot))
* [#33](https://github.com/nickschot/ember-mobile-menu/pull/33) add dynamic shadow feature (intensity based on drag position) ([@nickschot](https://github.com/nickschot))
* [#29](https://github.com/nickschot/ember-mobile-menu/pull/29) add support for embedding a menu in another element ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#48](https://github.com/nickschot/ember-mobile-menu/pull/48) fix mode reverting to default when dragging non-default menu to a close ([@nickschot](https://github.com/nickschot))

#### :memo: Documentation
* [#50](https://github.com/nickschot/ember-mobile-menu/pull/50) update & extend documentation ([@nickschot](https://github.com/nickschot))
* [#47](https://github.com/nickschot/ember-mobile-menu/pull/47) add configurable landing page demo ([@nickschot](https://github.com/nickschot))
* [#30](https://github.com/nickschot/ember-mobile-menu/pull/30) improve documentation with left/right/multiple menu setups ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#51](https://github.com/nickschot/ember-mobile-menu/pull/51) inline the micro tween engine from ember-mobile-core ([@nickschot](https://github.com/nickschot))
* [#49](https://github.com/nickschot/ember-mobile-menu/pull/49) update ember-source & ember-try config ([@nickschot](https://github.com/nickschot))
* [#38](https://github.com/nickschot/ember-mobile-menu/pull/38) minimize calls to getBoundingClientRect ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v0.1.0-beta.2 (2019-12-13)

#### :rocket: Enhancement
* [#28](https://github.com/nickschot/ember-mobile-menu/pull/28) upgrade to ember-cli 3.12.0 & upgrade dependencies ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#24](https://github.com/nickschot/ember-mobile-menu/pull/24) Add drag tests & pan simulator ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v0.1.0-beta.1 (2019-03-29)

#### :boom: Breaking Change
* [#22](https://github.com/nickschot/ember-mobile-menu/pull/22) use ember-concurrency for opening/closing menu ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* [#19](https://github.com/nickschot/ember-mobile-menu/pull/19) ember-cli 3.8 & dependency updates ([@nickschot](https://github.com/nickschot))
* [#18](https://github.com/nickschot/ember-mobile-menu/pull/18) upgrade ember-useragent to 0.9.0 ([@nickschot](https://github.com/nickschot))
* [#17](https://github.com/nickschot/ember-mobile-menu/pull/17) Precompile CSS & include precompiled CSS if ember-cli-sass is not installed ([@nickschot](https://github.com/nickschot))

#### :memo: Documentation
* [#20](https://github.com/nickschot/ember-mobile-menu/pull/20) Documentation improvements & cleanup ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#21](https://github.com/nickschot/ember-mobile-menu/pull/21) improve test suite ([@nickschot](https://github.com/nickschot))
* [#23](https://github.com/nickschot/ember-mobile-menu/pull/23) pin nwsapi to release that supports node 6 ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))
