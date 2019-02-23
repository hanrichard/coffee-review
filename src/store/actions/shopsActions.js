export const createReview = review => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore =  getFirestore();
        // const profile = getState().firebase.profile;
        // const authorId = getState().firebase.auth.uid;

        firestore.collection('reviews').add({
            ...review,
            // authorFirstname: profile.firstname,
            // authorLastname: profile.lastname,
            // authorId: authorId,
            createdat: new Date()
        }).then(()=>(dispatch({
            type: 'CREATE_REVIEW',
            review
            }) 
        )).catch((err)=>{
            dispatch({
                type: 'CREATE_REVIEW_ERROR', err
            })
        })    
    }
}

// export const clickshop = shopid => ({
//     type: 'FIND_SHOPID',
//     shopid 
// })