const initState = {
    reviews: []
}

const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_REVIEW':
            console.log('create project', action.review)
            return state;
        case 'CREATE_REVIEW_ERR':
            console.log('create project err', action.err)
            return state;
        default:
            return state;
    }
}

export default reviewsReducer