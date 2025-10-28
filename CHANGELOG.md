# Changelog

## Release (2025-10-28)

* ember-mobile-menu 6.0.0 (major)

#### :boom: Breaking Change
* `ember-mobile-menu`
  * [#1160](https://github.com/nickschot/ember-mobile-menu/pull/1160) Remove @ember/render-modifiers ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :rocket: Enhancement
* `ember-mobile-menu`
  * [#1269](https://github.com/nickschot/ember-mobile-menu/pull/1269) Replace ember-set-body-class with ember-primitives (v2) version ([@nickschot](https://github.com/nickschot))
  * [#1245](https://github.com/nickschot/ember-mobile-menu/pull/1245) Deprecate decorator syntax of ember-concurrency  ([@johanrd](https://github.com/johanrd))
  * [#1158](https://github.com/nickschot/ember-mobile-menu/pull/1158) Remove unneeded peers ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :memo: Documentation
* [#1244](https://github.com/nickschot/ember-mobile-menu/pull/1244) Update CONTRIBUTING.md to reflect practice in v2 addon ([@johanrd](https://github.com/johanrd))

#### :house: Internal
* [#1161](https://github.com/nickschot/ember-mobile-menu/pull/1161) Fix floating dependencies test ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* [#1129](https://github.com/nickschot/ember-mobile-menu/pull/1129) Docs smoke test & lint config fixes ([@nickschot](https://github.com/nickschot))
* [#1128](https://github.com/nickschot/ember-mobile-menu/pull/1128) Fix addon-docs deployment ([@nickschot](https://github.com/nickschot))
* [#1124](https://github.com/nickschot/ember-mobile-menu/pull/1124) Get rid of dependenciesMeta injected and use pnpm flags only when needed in CI ([@nickschot](https://github.com/nickschot))

#### Committers: 3
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)
- [@johanrd](https://github.com/johanrd)

## Release (2025-02-25)

ember-mobile-menu 5.3.0 (minor)

#### :rocket: Enhancement
* `ember-mobile-menu`
  * [#1084](https://github.com/nickschot/ember-mobile-menu/pull/1084) Convert to GJS components ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## Release (2025-02-23)

ember-mobile-menu 5.2.0 (minor)

#### :rocket: Enhancement
* `ember-mobile-menu`, `test-app`
  * [#1080](https://github.com/nickschot/ember-mobile-menu/pull/1080) Add support for @ember/test-waiters v4 ([@nickschot](https://github.com/nickschot))
* `ember-mobile-menu`
  * [#1077](https://github.com/nickschot/ember-mobile-menu/pull/1077) Add support for tracked-built-ins v4 ([@nickschot](https://github.com/nickschot))
  * [#1064](https://github.com/nickschot/ember-mobile-menu/pull/1064) Make @glimmer/component & @glimmer/component peerDependency instead of dependency & support 2.0.0 ([@nickschot](https://github.com/nickschot))
  * [#1073](https://github.com/nickschot/ember-mobile-menu/pull/1073) Replace ember-resources & friends with native code ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* `ember-mobile-menu`
  * [#1064](https://github.com/nickschot/ember-mobile-menu/pull/1064) Make @glimmer/component & @glimmer/component peerDependency instead of dependency & support 2.0.0 ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* `docs`, `ember-mobile-menu`, `test-app`
  * [#1072](https://github.com/nickschot/ember-mobile-menu/pull/1072) Upgrade to latest v2 blueprint structure ([@nickschot](https://github.com/nickschot))
* `test-app`
  * [#1071](https://github.com/nickschot/ember-mobile-menu/pull/1071) Add all ember v5 LTS versions to ember-try ([@nickschot](https://github.com/nickschot))
* Other
  * [#898](https://github.com/nickschot/ember-mobile-menu/pull/898) Prepare Release ([@github-actions[bot]](https://github.com/apps/github-actions))
  * [#897](https://github.com/nickschot/ember-mobile-menu/pull/897) Fix docs deploy ([@nickschot](https://github.com/nickschot))

#### Committers: 2
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@github-actions[bot]](https://github.com/apps/github-actions)

## Release (2024-02-16)



#### :house: Internal
* [#896](https://github.com/nickschot/ember-mobile-menu/pull/896) Update dependency release-plan to v0.8.0 ([@renovate[bot]](https://github.com/apps/renovate))
* [#897](https://github.com/nickschot/ember-mobile-menu/pull/897) Fix docs deploy ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## Release (2024-02-16)

ember-mobile-menu 5.1.0 (minor)

#### :rocket: Enhancement
* `ember-mobile-menu`
  * [#891](https://github.com/nickschot/ember-mobile-menu/pull/891) Inline body scroll lock library, apply small fixes & (unofficial) fastboot support ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#892](https://github.com/nickschot/ember-mobile-menu/pull/892) Setup release-plan ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v5.0.0 (2024-02-09)

#### :boom: Breaking Change
* [#877](https://github.com/nickschot/ember-mobile-menu/pull/877) Require ember-resources >=v6.4.0 (inc. v7) ([@nickschot](https://github.com/nickschot))
* [#821](https://github.com/nickschot/ember-mobile-menu/pull/821) Drop support for mm.LinkTo component, use LinkTo with on click modifier instead ([@nickschot](https://github.com/nickschot))
* [#779](https://github.com/nickschot/ember-mobile-menu/pull/779) Replace SCSS with plain CSS approach ([@nickschot](https://github.com/nickschot))
* [#778](https://github.com/nickschot/ember-mobile-menu/pull/778) Convert to v2 addon ([@nickschot](https://github.com/nickschot))
* [#744](https://github.com/nickschot/ember-mobile-menu/pull/744) Replace tracked-maps-and-sets with tracked-built-ins ([@nickschot](https://github.com/nickschot))
* [#742](https://github.com/nickschot/ember-mobile-menu/pull/742) Drop ember-source 3.28 ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* [#878](https://github.com/nickschot/ember-mobile-menu/pull/878) Allow ember-concurrency v4 ([@nickschot](https://github.com/nickschot))
* [#855](https://github.com/nickschot/ember-mobile-menu/pull/855) Implement basic scale correction for gestures ([@nickschot](https://github.com/nickschot))
* [#827](https://github.com/nickschot/ember-mobile-menu/pull/827) Add ember-gesture-modifiers v6 to allowed range ([@nickschot](https://github.com/nickschot))
* [#804](https://github.com/nickschot/ember-mobile-menu/pull/804) Re-add support for ember-source v3.28.0 ([@nickschot](https://github.com/nickschot))
* [#798](https://github.com/nickschot/ember-mobile-menu/pull/798) Replace ember-could-get-used-to-this with ember-resources (by @johanrd ) ([@nickschot](https://github.com/nickschot))
* [#779](https://github.com/nickschot/ember-mobile-menu/pull/779) Replace SCSS with plain CSS approach ([@nickschot](https://github.com/nickschot))

#### :memo: Documentation
* [#822](https://github.com/nickschot/ember-mobile-menu/pull/822) Update docs with style customization section ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#820](https://github.com/nickschot/ember-mobile-menu/pull/820) Fix workspaces reference in package.json ([@nickschot](https://github.com/nickschot))
* [#819](https://github.com/nickschot/ember-mobile-menu/pull/819) Remove prepare from root package.json ([@nickschot](https://github.com/nickschot))
* [#804](https://github.com/nickschot/ember-mobile-menu/pull/804) Re-add support for ember-source v3.28.0 ([@nickschot](https://github.com/nickschot))
* [#816](https://github.com/nickschot/ember-mobile-menu/pull/816) Add npmrc w/ proper peerDep config, fix monorepo resolution ([@nickschot](https://github.com/nickschot))
* [#810](https://github.com/nickschot/ember-mobile-menu/pull/810) Downgrade to actions/setup-node@v3 due to performance bug with v4 ([@nickschot](https://github.com/nickschot))
* [#788](https://github.com/nickschot/ember-mobile-menu/pull/788) Update dependency rollup to v4 ([@renovate[bot]](https://github.com/apps/renovate))
* [#800](https://github.com/nickschot/ember-mobile-menu/pull/800) Specify ember-source >=v4 as a peer dependency ([@nickschot](https://github.com/nickschot))
* [#791](https://github.com/nickschot/ember-mobile-menu/pull/791) Enable readme/license copying to published addon ([@nickschot](https://github.com/nickschot))
* [#790](https://github.com/nickschot/ember-mobile-menu/pull/790) Remove Travis CI badge ([@nickschot](https://github.com/nickschot))
* [#789](https://github.com/nickschot/ember-mobile-menu/pull/789) Remove v1 addon/cleanup ([@nickschot](https://github.com/nickschot))
* [#745](https://github.com/nickschot/ember-mobile-menu/pull/745) Remove reliance on sinon ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))
- johanrd ([@johanrd](https://github.com/johanrd))

## v5.0.0-2 (2023-12-01)

#### :boom: Breaking Change
* [#821](https://github.com/nickschot/ember-mobile-menu/pull/821) Drop support for mm.LinkTo component, use LinkTo with on click modifier instead ([@nickschot](https://github.com/nickschot))

#### :memo: Documentation
* [#822](https://github.com/nickschot/ember-mobile-menu/pull/822) Update docs with style customization section ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#820](https://github.com/nickschot/ember-mobile-menu/pull/820) Fix workspaces reference in package.json ([@nickschot](https://github.com/nickschot))
* [#819](https://github.com/nickschot/ember-mobile-menu/pull/819) Remove prepare from root package.json ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v5.0.0-1 (2023-12-01)

#### :rocket: Enhancement
* [#804](https://github.com/nickschot/ember-mobile-menu/pull/804) Re-add support for ember-source v3.28.0 ([@nickschot](https://github.com/nickschot))
* [#798](https://github.com/nickschot/ember-mobile-menu/pull/798) Replace ember-could-get-used-to-this with ember-resources (by @johanrd ) ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#804](https://github.com/nickschot/ember-mobile-menu/pull/804) Re-add support for ember-source v3.28.0 ([@nickschot](https://github.com/nickschot))
* [#816](https://github.com/nickschot/ember-mobile-menu/pull/816) Add npmrc w/ proper peerDep config, fix monorepo resolution ([@nickschot](https://github.com/nickschot))
* [#810](https://github.com/nickschot/ember-mobile-menu/pull/810) Downgrade to actions/setup-node@v3 due to performance bug with v4 ([@nickschot](https://github.com/nickschot))
* [#788](https://github.com/nickschot/ember-mobile-menu/pull/788) Update dependency rollup to v4 ([@renovate[bot]](https://github.com/apps/renovate))
* [#800](https://github.com/nickschot/ember-mobile-menu/pull/800) Specify ember-source >=v4 as a peer dependency ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v5.0.0-0 (2023-11-17)

#### :boom: Breaking Change
* [#779](https://github.com/nickschot/ember-mobile-menu/pull/779) Replace SCSS with plain CSS approach ([@nickschot](https://github.com/nickschot))
* [#778](https://github.com/nickschot/ember-mobile-menu/pull/778) Convert to v2 addon ([@nickschot](https://github.com/nickschot))
* [#744](https://github.com/nickschot/ember-mobile-menu/pull/744) Replace tracked-maps-and-sets with tracked-built-ins ([@nickschot](https://github.com/nickschot))
* [#742](https://github.com/nickschot/ember-mobile-menu/pull/742) Drop ember-source 3.28 ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* [#779](https://github.com/nickschot/ember-mobile-menu/pull/779) Replace SCSS with plain CSS approach ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#791](https://github.com/nickschot/ember-mobile-menu/pull/791) Enable readme/license copying to published addon ([@nickschot](https://github.com/nickschot))
* [#790](https://github.com/nickschot/ember-mobile-menu/pull/790) Remove Travis CI badge ([@nickschot](https://github.com/nickschot))
* [#789](https://github.com/nickschot/ember-mobile-menu/pull/789) Remove v1 addon/cleanup ([@nickschot](https://github.com/nickschot))
* [#745](https://github.com/nickschot/ember-mobile-menu/pull/745) Remove reliance on sinon ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v4.0.0 (2023-10-20)

#### :boom: Breaking Change
* [#734](https://github.com/nickschot/ember-mobile-menu/pull/734) Drop Node 16 support ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v4.0.0-beta.0 (2023-08-11)

#### :boom: Breaking Change
* [#687](https://github.com/nickschot/ember-mobile-menu/pull/687) Drop support for node v14 ([@nickschot](https://github.com/nickschot))
* [#685](https://github.com/nickschot/ember-mobile-menu/pull/685) Drop support for Ember 3.24 ([@nickschot](https://github.com/nickschot))
* [#631](https://github.com/nickschot/ember-mobile-menu/pull/631) Update dependency ember-on-resize-modifier to v2 ([@renovate[bot]](https://github.com/apps/renovate))
* [#576](https://github.com/nickschot/ember-mobile-menu/pull/576) Update dependency ember-gesture-modifiers to v5 ([@renovate[bot]](https://github.com/apps/renovate))

#### :rocket: Enhancement
* [#688](https://github.com/nickschot/ember-mobile-menu/pull/688) Allow ember-concurrency v3 ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#633](https://github.com/nickschot/ember-mobile-menu/pull/633) Set correct supported ember-source as peerDependency ([@nickschot](https://github.com/nickschot))
* [#682](https://github.com/nickschot/ember-mobile-menu/pull/682) Fix ember-cli-sass check not working under ember-cli 5/embroider ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#686](https://github.com/nickschot/ember-mobile-menu/pull/686) Add LTS 4.4, 4.8 and 4.12 to test-matrix ([@nickschot](https://github.com/nickschot))
* [#681](https://github.com/nickschot/ember-mobile-menu/pull/681) Update test-app to ember v5, CI node to 16 ([@nickschot](https://github.com/nickschot))
* [#679](https://github.com/nickschot/ember-mobile-menu/pull/679) Update to stable lerna-changelog package ([@nickschot](https://github.com/nickschot))
* [#647](https://github.com/nickschot/ember-mobile-menu/pull/647) Allow ember-beta and ember-canary to fail ([@nickschot](https://github.com/nickschot))
* [#575](https://github.com/nickschot/ember-mobile-menu/pull/575) Add missing peerDeps ([@nickschot](https://github.com/nickschot))
* [#574](https://github.com/nickschot/ember-mobile-menu/pull/574) Upgrade to eslint v8 ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v3.0.3 (2022-07-15)

## v3.0.2 (2022-07-15)

#### :house: Internal
* [#347](https://github.com/nickschot/ember-mobile-menu/pull/347) Update dependency ember-cli-addon-docs to v5 ([@renovate[bot]](https://github.com/apps/renovate))

## v3.0.1 (2022-07-15)

#### :memo: Documentation
* [#365](https://github.com/nickschot/ember-mobile-menu/pull/365) Move README, CONTRIBUTING and LICENSE.md to addon folder ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v3.0.0 (2022-07-15)

#### :boom: Breaking Change
* [#356](https://github.com/nickschot/ember-mobile-menu/pull/356) Drop node 12 support ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#361](https://github.com/nickschot/ember-mobile-menu/pull/361) remove ember-cli-htmlbars override now that 6.1.0 has been released ([@nickschot](https://github.com/nickschot))
* [#358](https://github.com/nickschot/ember-mobile-menu/pull/358) Upgrade to pnpm v7 ([@nickschot](https://github.com/nickschot))
* [#357](https://github.com/nickschot/ember-mobile-menu/pull/357) declare ember-source peer dependency for addon ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v3.0.0-beta.3 (2022-04-03)

#### :house: Internal
* [#238](https://github.com/nickschot/ember-mobile-menu/pull/238) Revert "Prevent open/close from being triggered a huge amount of times when unnecessary" ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v3.0.0-beta.2 (2022-04-03)

#### :house: Internal
* [#261](https://github.com/nickschot/ember-mobile-menu/pull/261) Move npmignore to addon package ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))

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
