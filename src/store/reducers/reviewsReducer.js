const initState = {
    reviews: [
        {id: 1, title: '1test test test test ', content: '1 test test '},
        {id: 2, title: '2test test test test ', content: '2 test test '},
        {id: 3, title: '3test test test test ', content: '3 test test '},
    ]
}

const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('create project', action.project)
            return state;
        case 'CREATE_PROJECT_ERR':
            console.log('create project err', action.err)
            return state;
        default:
            return state;
    }
}

export default reviewsReducer