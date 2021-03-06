const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERR':
            return {
                ...state,
                authError: 'login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login scucess')
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('sign up success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state, 
                authError: action.err.message
            }    
        default:
            return state
    }
}

export default authReducer