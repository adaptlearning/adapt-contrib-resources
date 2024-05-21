# adapt-contrib-resources

**Resources** is an *extension* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).
<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/resources01.gif" alt="Resources in action">

**Resources** provides a way to present extra materials to the learner that is outside of content flow. **Resources** takes advantage of the Drawer&mdash;a panel that slides out from the right-hand side of the page. It is always accessible to the learner through an icon in the navigation bar. **Resources** organises links to documents such as PDFs, links to media, and links to other web resources.

[Visit the **Resources** wiki](https://github.com/adaptlearning/adapt-contrib-resources/wiki) for more information about its functionality.

## Installation

As one of Adapt's *[core extensions](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#extensions),* **Resources** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **Resources** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:
`adapt install adapt-contrib-resources`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:
    `"adapt-contrib-resources": "*"`
    Then running the command:
    `adapt install`
    (This second method will reinstall all plug-ins listed in *adapt.json*.)

* If **Resources** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

<div float align=right><a href="#top">Back to Top</a></div>

## Settings

The attributes listed below are used in *course.json* to configure **Resources**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-resources/blob/master/example.json). Some attributes can also be overridden for each content object in *contentObjects.json* (see [*example.json*](https://github.com/adaptlearning/adapt-contrib-resources/blob/master/example.json)).

Visit the [**Resources** wiki](https://github.com/adaptlearning/adapt-contrib-resources/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki).

**\_resources** (object): The Resources object that contains values for **title**, **description**, **\_filterButtons**, **\_filterAria**, and **\_resourcesItems**.

>**\_isEnabled** (boolean): Turns **Resources** on and off. Acceptable values are `true` and `false`.

>**\_drawerOrder** (number): Determines the order in which this extension appears as a drawer item. Acceptable values are numbers.

>**title** (string): This text is displayed (along with the **description**) in the [Drawer](https://github.com/adaptlearning/adapt_framework/wiki/Core-modules#drawer) as part of a button that gives access to the resources. This property only shows when more than one extension is using the drawer.

>**description** (string): This text is displayed (along with the **title**) in the [Drawer](https://github.com/adaptlearning/adapt_framework/wiki/Core-modules#drawer) as part of a button that gives access to the resources. This property only shows when more than one extension is using the drawer.

>**displayTitle** (string): The title for the resources which displays at the top of the resources drawer.

>**body** (string): The body text for the resources which displays at the top of the resources drawer.

>**instruction** (string): The instruction text for the resources which displays at the top of the resources drawer.

>**\_enableFilters** (boolean): Turns the filter buttons on and off. Acceptable values are `true` and `false`. Defaults to `true`. Note that the filter buttons will be automatically disabled if all `_resourcesItems` items have the same `_type` value.

>**\_filterButtons** (object):  This attribute group maintains the labels for the four buttons that filter resources by type. It contains values for **all**, **document**, **media**, and **link**.

>>**all** (string): This text appears on the button that returns all **\_resourcesItems**.

>>**document** (string): This text appears on the filter button that returns **\_resourcesItems** with `"_type": "document"`.

>>**media** (string): This text appears on the filter button that returns **\_resourcesItems** with `"_type": "media"`.

>>**link** (string): This text appears on the filter button that returns **\_resourcesItems** with `"_type": "link"`.

>**\_filterAria** (object): This attribute group maintains the Aria labels for the four buttons that filter resources by type. It contains values for **allAria**, **documentAria**, **mediaAria**, and **linkAria**.

>>**allAria** (string): This text is associated with the button that returns all **\_resourcesItems** and is read by assistive technologies.

>>**documentAria** (string): This text is associated with the button that returns **\_resourcesItems** with `"_type": "document"`and is read by assistive technologies.

>>**mediaAria** (string): This text is associated with the button that returns **\_resourcesItems** with `"_type": "media"`and is read by assistive technologies.

>>**linkAria** (string): This text is associated with the button that returns **\_resourcesItems** with `"_type": "link"`and is read by assistive technologies.

>**itemAriaExternal** (string): This text is associated with each resource item. It renders as part of the aria label to tell screen readers that the content will open in an external link.

>**\_resourcesItems** (object):  This object stores properties for each resource item. Multiple resource items may be created. Each contains values for **\_type**, **title**, **description** (optional), **\_link**, **filename** and **\_forceDownload**.

>>**\_type** (string):  This text is used to filter resources. If the resource is to be returned in a filtered group, this value must be one of the following: `document`, `media`, `link`, or one of the ten custom types (ex. `custom1`, `custom2`). (Note: There is no file type validation as part of **Resources**.)

>>**title** (string):  This text appears (along with **description**) as a label on the button that links to the item.

>>**description** (string):  This optional text appears (along with **title**) as a label on the button that links to the item.

>>**\_link** (string):  Path to the resource item, e.g., *course/en/pdf/diagram.pdf*.

>>**filename** (string): Allows the name of the downloaded file to be different to that of the source filename. Note that this feature only works in browsers that support the [`download` attribute](https://caniuse.com/#search=download) and is mainly intended for Adapt Authoring Tool users.

>>**\_forceDownload** (boolean): Forces the resource to be downloaded rather than opened in a new window. Defaults to `false`. Note that this feature only works in browsers that support the [`download` attribute](https://caniuse.com/#search=download) and only with resources that are part of the course content or available from a [same-origin URL](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

No known limitations.

----------------------------
<a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="Adapt Learning logo" align="right"></a>
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-resources/graphs/contributors)<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
