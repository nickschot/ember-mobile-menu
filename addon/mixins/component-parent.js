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

import { schedule } from '@ember/runloop';
import { A } from '@ember/array';
import Mixin from '@ember/object/mixin';

/**
 * Mixin for components that act as a parent component in a parent-child relationship of components
 *
 * @class ComponentParent
 * @namespace Mixins
 * @private
 */
export default Mixin.create({

  /**
   * Array of registered child components
   *
   * @property children
   * @type array
   * @protected
   */
  children: null,

  init() {
    this._super(...arguments);
    this.set('children', A());
  },

  /**
   * Register a component as a child of this parent
   *
   * @method registerChild
   * @param child
   * @public
   */
  registerChild(child) {
    schedule('actions', this, function() {
      this.get('children').addObject(child);
    });
  },

  /**
   * Remove the child component from this parent component
   *
   * @method removeChild
   * @param child
   * @public
   */
  removeChild(child) {
    schedule('actions', this, function() {
      this.get('children').removeObject(child);
    });
  }
});
