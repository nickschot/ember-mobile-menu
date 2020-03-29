
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
