# adapt-contrib-resources  
    
**Resources** is an *extension* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  
<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/resources01.gif" alt="Resources in action">      

**Resources** provides a way to present extra materials to the learner that is outside of content flow. **Resources** takes advantage of the Drawer&mdash;a panel that slides out from the right-hand side of the page. It is always accessible to the learner through an icon in the navigation bar. **Resources** organises links to documents such as PDFs, links to media, and links to other web resources.

[Visit the **Resources** wiki](https://github.com/adaptlearning/adapt-contrib-resources/wiki) for more information about its functionality. 

##Installation

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

##Settings  
The attributes listed below are used in *course.json* to configure **Resources**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-resources/blob/master/example.json). Visit the [**Resources** wiki](https://github.com/adaptlearning/adapt-contrib-resources/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki).  

**_resources** (object): The Resources object that contains values for **title**, **description**, **_filterButtons**, **_filterAria**, and **_resourcesItems**.  

>**title** (string): This text is displayed (along with the **description**) in the [Drawer](https://github.com/adaptlearning/adapt_framework/wiki/Core-modules#drawer) as part of a button that gives access to the resources.  

>**description** (string): This text is displayed (along with the **title**) in the [Drawer](https://github.com/adaptlearning/adapt_framework/wiki/Core-modules#drawer) as part of a button that gives access to the resources.  

>**_filterButtons** (object):  This attribute group maintains the labels for the four buttons that filter resources by type. It contains values for **all**, **document**, **media**, and **link**.

>>**all** (string): This text appears on the button that returns all **_resourcesItems**.    

>>**document** (string): This text appears on the filter button that returns **_resourcesItems** with `"_type": "document"`.  

>>**media** (string): This text appears on the filter button that returns **_resourcesItems** with `"_type": "media"`.  

>>**link** (string): This text appears on the filter button that returns **_resourcesItems** with `"_type": "link"`.    

>**_filterAria** (object): This attribute group maintains the Aria labels for the four buttons that filter resources by type. It contains values for **allAria**, **documentAria**, **mediaAria**, and **linkAria**.  

>>**allAria** (string): This text is associated with the button that returns all **_resourcesItems** and is read by assistive technologies.    

>>**documentAria** (string): This text is associated with the button that returns **_resourcesItems** with `"_type": "document"`and is read by assistive technologies.  

>>**mediaAria** (string): This text is associated with the button that returns **_resourcesItems** with `"_type": "media"`and is read by assistive technologies.  

>>**linkAria** (string): This text is associated with the button that returns **_resourcesItems** with `"_type": "link"`and is read by assistive technologies.  

>**itemAriaExternal** (string): This text is associated with each resource item. It renders as part of the aria label to tell screen readers that the content will open in an external link.

>**_resourcesItems** (object):  This object stores properties for each resource item. Multiple resource items may be created. Each contains values for **_type**, **title**, **description** (optional), and **_link**.

>>**_type** (string):  This text is used to filter resources. If the resource is to be returned in a filtered group, this value must be one of the following: `document`, `media`, or `link`. (Note: There is no file type validation as part of **Resources**.)

>>**title** (string):  This text appears (along with **description**) as a label on the button that links to the item.  

>>**description** (string):  This optional text appears (along with **title**) as a label on the button that links to the item.    

>>**_link** (string):  This value is the URI that accesses the resource item, e.g., *course/en/pdf/diagram.pdf*.

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
No known limitations.  

----------------------------
**Version number:**  2.0   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a> 
**Framework versions:**  2.0     
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-resources/graphs/contributors)    
**Accessibility support:** WAI AA   
**RTL support:** yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 7+8), Safari for iPad (iOS 7+8), Safari 8, Opera    
