const dataReducerDefaultState = {
    usersData:[],
    companyData:[],
    userProfile:[],
    updateData:[],
    submitAuctionData:[],
    auctionsData:[],
    submitBidData:[],
    patientsData:[],
    flag:''
}

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {

            case 'USER-DATA':
            return ({
                ...state,
                    usersData:action.data
            })
            case 'PATIENTS-DATA':
            return ({
                ...state,
                    patientsData:action.data
            })
            case 'USER-PROFILE-DATA':
            return ({
                ...state,
                userProfile:action.data
            })
            case 'UPDATE-USER':
            return({
                ...state,
                updateData:action.updates
                })
            
        default:
            return state;
    }
}