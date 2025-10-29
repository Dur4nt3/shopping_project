# Todos

## Tests

### Misc

**Theme.test.jsx:**

1) Add a test to check if the theme is correctly changed to dark when a user's preferred color scheme is dark
*Check that the context is adjust correctly to "dark" and that document.body has the class "dark-mode".*

---------

### Root

**MainNav.test.jsx:**

1) Test using beforeEach for the test setups
2) Write a test for checking whether or not you can view the cart when clicking the cart icon
3) Add a full test suite for the cart (add/removing items, etc.)

---------

### Shop

**ShopFilters.test.jsx:**

1) Test applying each filter individually - ensure data is filtered properly
2) Test applying multiple filters together - same as above, ensuring data is filtered properly
*Note: mock the fetch request creating a custom item list*
*Note 2: it is more than likely that userEvent will work on these types of inputs, therefore, use fireEvent to ensure the correct values are selected.*

**ShopMain.test.jsx:**

*Update the comment about the location of cart related tests once those test are implemented.*

1) Test using beforeEach for the test setups
2) Test the add to cart functionality:
    - Add 1 item to the cart via pressing the "plus" button and the "Add to Cart" button, ensuring the item is found within the cart
    *Note, after addition to the cart, ensure the animation and text change are shown.*
    - Press the plus and minus button multiple times, end up with the number 2 in the input, and add to cart, ensuring 2 of the item are shown in the cart
    - Add 1 of a certain item to the cart twice (i.e., increment => add, increment => add) ensure 2 of the item are shown in the cart
    - Type in the input to determine the order count and add to cart (without pressing the +/- button), ensure items are properly shown in the cart
    - Press enter on the input after typing an order count, ensure the item is properly added to the cart
    - Invoke an error, ensure the error animation and text change are shown
    - Add different items to the cart, ensure each individual item is shown in the cart

**ShopHeader.test.jsx:**

1) Add a snapshot test, as the navbar is already tested

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

**MainNav.jsx:**

1) Implement the cart button functionality (i.e., opening a cart modal when clicking the cart icon)

---------

### Shop

**ShopFilters.jsx:**

1) Adjust styling on smaller layouts so that when you open the filters there is no shift in the layout

**ShopItem.jsx:**

1) Create an add to cart function, this function gets an item's id and order count and updates the Cart context
*Note: If an item is not an integer between 0 and 10, raise an error*

2) Add to cart animation:

When invoking the add to cart button on a certain item, play an animation on the item's add to cart button:

- Error Animation: shake animation + text changes to "Error" + red background

- Success Animation: jello animation + text changes to "Added to Cart" + green background

**ItemCountController.jsx:**

1) Add the 'onPressEnter' property to the number input to add item to cart when pressing enter
