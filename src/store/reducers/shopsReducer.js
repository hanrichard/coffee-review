const initState = {
    shops: [
       
    ]
}

const shopReducer = (state = initState, action) => {
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

export default shopReducer