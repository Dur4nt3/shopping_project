# Todos

## Tests

### Misc

**Theme.test.jsx:**

1) Add a test to check if the theme is correctly changed to dark when a user's preferred color scheme is dark
*Check that the context is adjust correctly to "dark" and that document.body has the class "dark-mode".*

---------

### Root

**MainNav.test.jsx:**

1) Ensure you can navigate from a non-root location (shop, item, etc.) back to root ('/') by clicking the site name on the navbar
2) Write a test for checking whether or not you can view the cart when clicking the cart icon

---------

### Shop

---------

### Checkout

---------

### Item

#--------------------------------------#

## Design/Creation

### Misc

**Theme.jsx:**

1) Uncomment automatic theme adjustment

---------

**RootError.jsx:**

1) Design and implement the error page

---------

### Root

**MainNav.jsx:**

1) Make the navbar sticky (ensure it sticks to the top and its z-index is above all other elements)
2) Implement the cart button functionality (i.e., opening a cart modal when clicking the cart icon)

---------

### Shop

**ShopFilters.jsx:**

1) Implement a variant for wide layouts:
    *only relevant for layout where all the secondary filter content can fit in one row*
    1) Stack the filter choices and their content in the same level (flex container with a row direction rather than a column direction)
    2) Align the filters to the left and their content will be displayed near the 3 filter selectors with a rather large gap in-between

2) Create an additional "search" feature, separate it from the main 3 filters with a border.
This filter follows the same core principles of the other filters when it comes to data fetching and handling.

3) Optimize the "useSyncFilterData" custom hook:
    - When activating a filter but the data hasn't changed, don't set the state

4) Optimize filter activation/deactivation:
    - When changing a filters value (without applying), deactivating it, and activating it again the filter data will not be synchronized with the URL.
    Solve this using the following:
    Require filter activation to also include the current data of the filter.
    Within the filter activation function, set the parameter anew instead of depending on old data.





