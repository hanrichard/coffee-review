export const createProject = project => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore =  getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project,
            authorFirstname: profile.firstname,
            authorLastname: profile.lastname,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>(dispatch({
            type: 'CREATE_PROJECT',
            project
            }) 
        )).catch((err)=>{
            dispatch({
                type: 'CCREATE_PROJECT_ERROR', err
            })
        })    
    }
}

// export const clickshop = shopid => ({
//     type: 'FIND_SHOPID',
//     shopid 
// })