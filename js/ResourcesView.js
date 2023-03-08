import Adapt from 'core/js/adapt';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

export default class ResourcesView extends Backbone.View {

  className() {
    return 'resources';
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
  }

  render() {
    const data = {
      model: this.model.toJSON(),
      resources: this.model.get('_resources')
    };
    ReactDOM.render(<templates.resources {...data} />, this.el);

    _.defer(() => {
      Adapt.trigger('view:render', this);
      this.listenTo(Adapt, 'drawer:closed', this.remove);
    });

    return this;
  }

}
