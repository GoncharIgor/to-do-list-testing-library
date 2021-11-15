# testing-library/react

## screen query methods:

- getBy: default for getting element. If no element found - error
- findBy vs getBy: findBy - can be used with async/await
- findBy - good for testing scenarios, where http API calls are made (e.g. with axios)
- queryBy vs getBy: findBy - if no match - it returns "null" instead of an error
- queryBy - good for testing scenarios, where element has disappeared or check if it exists


## Best Practices
1.  Install and use the ESLint plugin for Testing Library: 
-  - `eslint-plugin-testing-library`
-  - `eslint-plugin-jest-dom`
2.  don't use `cleanup`: it happens automatically now
3. use `screen` for querying and debugging - you no longer need to keep the render call destructure up-to-date as you add/remove the queries you need
4. use `act` where neccessary: `render` and `fireEvent` are already wrapped in `act`
5. try to avoid using `container` for querying elements
6. Only use the `query* variants` for asserting that an element cannot found
7. Use `@testing-library/user-event` over `fireEvent` where possible - `type` call, will trigger keyDown, keyPress, and keyUp events for each character during typing.
8. use `find*` any time you want to query for something that may not be available right away, but not `waitFor`

## Mocks
React resets mocks every time. Inside node_modules/react-scripts/util  
We have "createJestConfig" file  
To change it, change in file: "resetMock: false"

If you don't create custom jest config, and run it with "jest runner",
then default one from "react-scripts" will be used
