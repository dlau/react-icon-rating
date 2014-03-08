react-icon-rating
=================

A react component for simple straightforward rating manipulation

gif:

![gif](http://i.imgur.com/4fjlj5h.gif)

###Installation
---
`npm install react-icon-rating`

###Usage
---
####Examples showing five stars
----
Font-Awesome 4:

`<IconRating toggledClassName="fa fa-star" untoggledClassName="fa fa-star-o"/>`

Glyphicons:

`<IconRating toggledClassName="glyphicon glyphicon-star" untoggledClassName="glyphicon glyphicon-star-empty"/>`

Others:
    The component assumes the icon is contained inside an <i> tag, fill the class names in accordingly.
    Do note, that you can pass additional classes to the IconRating for styling purposes.

####Events
---
Pass an `onChange` property to the component. It takes a function of with parameters:
    function onChange(number){
      //number is the rating the user has clicked
    }

###License
MIT
