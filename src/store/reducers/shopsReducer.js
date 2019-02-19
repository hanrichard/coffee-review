const initState = {
    shops: [],
    shopid: ''
}

const shopReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('create project', action.project)
            return state;
        case 'CREATE_PROJECT_ERR':
            console.log('create project err', action.err)
            return state;
        // case 'FIND_SHOPID':
        //     console.log('FIND_SHOPID', action.shopid)
        //     return {
        //         ...state, 
        //         shopid: "oK4i7b6A8f25d1RvGlg5"
        //     };
        default:
            return state;
    }
}

export default shopReducer