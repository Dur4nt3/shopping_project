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

2) Implement a activate/deactivate & apply filter buttons:
    Two buttons, one that allows to activate and deactivate the filter (retains the data), and one that applies the filter data
    *For the apply functionality, simply use a fetcher to submit the filter data to the search parameters, and use the loader to filter the content based on the given filters.*
    *Same goes for the activate/deactivate feature, it should use a fetcher to remove/add the filters.*
    *Note that activating/deactivating the filters doesn't change the data it holds, just simply redacts it from the search parameters.*

3) Create an additional "search" feature, separate it from the main 3 filters with a border.
This filter follows the same core principles of the other filters when it comes to data fetching and handling.

4) Adjustment needed due to feature 2:
    1) Decide whether the "currentItems" variable from "Shop" component is needed.
    2) A container additional to each filter content that allows to activate/deactivate and apply filters
    3) Within the filter activation/apply container create a fetcher form that will apply/activate/deactivate filters it does that by submitting the filter data to the search parameters
    4) Apply a filter function to the loader that take the search parameters and applies them (i.e., the filters) to the data.
    *Note, the execution of said function only happens if the data is fetches successfully.*

5) Optimization of filtering:
    Find a way to optimize filtering such that you don't have to refetch the data every single time you apply a filter.
    Possible solutions:
    1)  Check if state is preserved after the loader is execute, effectively allowing to not fetch data as it is already saved in the state
    2) Check if we can execute the fetcher without need to execute the loader/action, thus applying the filters locally (in state) rather than utilizing the loader to filter data.
    3) Move data fetching into the root loader and save said data into the localStorage, and for the shop loader check if the data is in the localStorage, if it is filter it based on the localStorage, if not, fetch it within the loader.

6) Potential solutions to the filter problem:
    1) Leave it as is, don't submit the filter data to the URL search parameters, as the QOL here is marginal
    2) Move the data fetching not into the loader, but into the "Shop" component (via a useEffect hook)
    This frees up the shop loader for managing filter data.
    The downside of this is having to handle loading and error state on the "Shop" component.
    This should be too hard but is not as simple as using a loader.
    *Can implement a custom hook for shop to fetch the, this makes it cleaner.*



