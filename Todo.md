# Todos

## Important

### Wrap tests in Cart context:

**Tests to Wrap:**

- HomeHeader.test.jsx
- MainNav.test.jsx
- ShopMainFetch.test.jsx
- ShopMainCart.test.jsx
- ShopPriceFilter.test.jsx
- ShopCategoryFilter.test.jsx
- ShopRatingFilter.test.jsx
- ShopQueryFilter.test.jsx
- ShopFilters.test.jsx

### Remove "console.log()"

**Currently Found in:**

- shopLoader.js
- Shop.jsx
- useSyncFilterData.jsx
- createFilteredItems.jsx

## Tests

### Misc

**Theme.test.jsx:**

1) Add a test to check if the theme is correctly changed to dark when a user's preferred color scheme is dark
*Check that the context is adjust correctly to "dark" and that document.body has the class "dark-mode".*
*This can probably be done by mocking the window.matchMedia property and ensuring it returns exactly the value desired.*


**RootError.test.jsx:**

1) Navigate to a non-existent route, ensure that the error page is displayed

---------

### Root

**MainNav.test.jsx:**

1) Ensure that if you are at a path click a link to the same path retain the search params
2) Write a test for checking whether or not you can view the cart when clicking the cart icon
3) Add a full test suite for the cart (add/removing items, etc.)

---------

### Shop

**ShopFilters.test.jsx:**

**ShopMain.test.jsx:**

1) Test the add to cart functionality:
    - Add 1 item to the cart via pressing the "plus" button and the "Add to Cart" button, ensuring the item is found within the cart
    *Note, after addition to the cart, ensure the animation and text change are shown.*
    - Press the plus and minus button multiple times, end up with the number 2 in the input, and add to cart, ensuring 2 of the item are shown in the cart
    - Add 1 of a certain item to the cart twice (i.e., increment => add, increment => add) ensure 2 of the item are shown in the cart
    - Type in the input to determine the order count and add to cart (without pressing the +/- button), ensure items are properly shown in the cart
    - Press enter on the input after typing an order count, ensure the item is properly added to the cart
    - Invoke an error, ensure the error animation and text change are shown
    - Add different items to the cart, ensure each individual item is shown in the cart

---------

### Checkout


#--------------------------------------#

## Design/Creation

### Misc

**Theme.jsx:**

1) Uncomment automatic theme adjustment

---------

**RootError.jsx:**

---------

### Root

**ScrollToTop.jsx:**

**MainNav.jsx:**

**NavMenu.css:**

**CartModal.jsx:**

1) Potentially add a tooltip to the item name when hovered/focused on
*This is done to remediate the issue where item names are truncated due to being too long*

---------

### Shop

**ShopFilters.jsx:**

**ShopItem.jsx:**

**ItemCountController.jsx:**

---------

### Checkout

**CheckoutMain.jsx:**

