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

---------

### Root

**MainNav.test.jsx:**

1) Ensure that if you are at a path click a link to the same path retain the search params
2) Write a test for checking whether or not you can view the cart when clicking the cart icon
3) Add a full test suite for the cart (add/removing items, etc.)

---------

### Shop

**ShopFilters.test.jsx:**

1) Test applying multiple filters together - same as above, ensuring data is filtered properly
2) Separate tests into four files (DataPrice, DataRating, DataCategory, DataQuery, DataAll)

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

1) Design and implement the error page

---------

### Root

**ScrollToTop.jsx:**

1) Test within the shop ensure it scrolls to top
2) Test to see if it disappear after applying a filter
*Expected bug: will not disappear after applying the first filter.*

**MainNav.jsx:**

1) Implement the cart button functionality (i.e., opening a cart modal when clicking the cart icon)

When a user clicks the cart button a modal will open
This modal will contain all the items (1 row per item)
Within each item's container there will be the ability to remove the item, and add/reduce the quantity of the added item (same to the controller in the item container)
Finally, at the end there will be a total with price of all items and the ability to checkout, which just navigates you to the checkout.

Visual depending on screen width:
- Mobile modal - slide in/out from top, full screen modal, fully opaque background
- Large layout modal - slide in/out from side, adjust width according to screen size (not full width), fully opaque background

**NavMenu.css:**

**CartModal.jsx:**

1) Potentially add a tooltip to the item name when hovered/focused on
*This is done to remediate the issue where item names are truncated due to being too long*
2) Save cart items to the localStorage, load cart items from the localStorage
*if using localStorage, it will be to be mocked in tests.*
*For the checkout, load from the cart by default, but if the cart is empty, check the localStorage.*

---------

### Shop

**ShopFilters.jsx:**

**ShopItem.jsx:**

1) Create an add to cart function, this function gets an item's id and order count and updates the Cart context
*Note: If an item is not an integer between 0 and 10, raise an error*

2) Add to cart animation:

When invoking the add to cart button on a certain item, play an animation on the item's add to cart button:

- Error Animation: shake animation + text changes to "Error" + red background

- Success Animation: jello animation + text changes to "Added to Cart" + green background

**ItemCountController.jsx:**

1) Add the 'onPressEnter' property to the number input to add item to cart when pressing enter
