// taken from ember-bootstrap (c) kaliber5

/*
The MIT License (MIT)

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import ComponentParentMixin from 'ember-mobile-menu/mixins/component-parent';

/**
 * Mixin for components that act as a child component in a parent-child relationship of components
 *
 * @class ComponentChild
 * @namespace Mixins
 * @private
 * @hide
 */
export default Mixin.create({

  /**
   * The parent component
   *
   * @property _parent
   * @private
   */
  _parent: computed(function() {
    return this.nearestOfType(ComponentParentMixin);
  }),

  /**
   * flag to check if component has already been registered
   * @property _didRegister
   * @type boolean
   * @private
   */
  _didRegister: false,

  /**
   * Register ourself as a child at the parent component
   * We use the `willRender` event here to also support the fastboot environment, where there is no `didInsertElement`
   *
   * @method _registerWithParent
   * @private
   */
  _registerWithParent() {
    if (!this._didRegister) {
      let parent = this.get('_parent');
      if (parent) {
        parent.registerChild(this);
        this._didRegister = true;
      }
    }
  },

  /**
   * Unregister from the parent component
   *
   * @method _unregisterFromParent
   * @private
   */
  _unregisterFromParent() {
    let parent = this.get('_parent');
    if (this._didRegister && parent) {
      parent.removeChild(this);
      this._didRegister = false;
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._registerWithParent();
  },

  willRender() {
    this._super(...arguments);
    this._registerWithParent();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._unregisterFromParent();
  }
});
