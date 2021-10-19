# testing-library/react

## screen query methods:

- findBy vs getBy: findBy - can be used with async/await
- findBy - good for testing scenarios, where http API calls are made (e.g. with axios) 
- queryBy vs getBy: findBy - if no match - it returns "null" instead of an error
- queryBy - good for testing scenarios, where element has disappeared or check if it exists


##Mocks
React resets mocks every time. Inside node_modules/react-scripts/util  
We have "createJestConfig" file  
To change it, change in file: "resetMock: false"

If you don't create custom jest config, and run it with "jest runner",
then default one from "react-scripts" will be used
