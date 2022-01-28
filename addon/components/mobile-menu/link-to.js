import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * An extended LinkTo component which provides an onClick hook.
 *
 * @class LinkTo
 * @public
 */
export default class LinkToComponent extends Component {
  get models() {
    if (this.args.models) {
      return this.args.models;
    }
    if (this.args.model) {
      return [this.args.model];
    }
    return [];
  }

  get query() {
    return this.args.query || {};
  }

  @action
  click() {
    this.args?.onClick();
  }
}
