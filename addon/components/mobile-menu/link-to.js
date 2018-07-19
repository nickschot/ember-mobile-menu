import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    this.set('current-when', this.get('qualifiedRouteName'));
  },

  onClick() {},

  click(){
    this.onClick();
  }
});
