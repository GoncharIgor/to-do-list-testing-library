/*
the name of the file is important. It has to be exact: "axios"
it globally mocks the f(): axios
e.g:  await axios.get("https://randomuser.me/api/?results=5")
*/

// response contains not all fields, but only the one we need for our Component
const mockResponse = {
    data: {
        results: [
            {
                name: {
                    first: 'brad',
                    last: 'gibson'
                },
                login: {
                    username: 'silverswan131'
                },
                picture: {
                    large: 'https://randomuser.me/api/portraits/men/75.jpg'
                }
            }
        ]
    }
}

export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}
