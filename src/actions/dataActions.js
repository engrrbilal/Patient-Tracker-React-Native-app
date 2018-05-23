import * as firebase from 'firebase'

// USER-DATA
export const usersData = (data) => ({
    type: 'USER-DATA',
    data
  });
  export const getUsersData = (test={}) => {
    return (dispatch) => {
      firebase.database().ref("Users").on('value',(snapshot) => {
        const data = [];
  
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        console.log(data)
        dispatch(usersData(data));
      })
    };
  };
  //USER-PROFILE-DATA
  export const userProfileData = (data) => ({
    type: 'USER-PROFILE-DATA',
    data
  });
  export const getUserProfileData = (test={}) => {
    console.log(test)
    return (dispatch) => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`Users/${user.uid}`).on("value", snap => {
                let profileData = snap.val();
                // console.log(dbdata)
                dispatch(userProfileData(profileData))
            })
        }

    })
    };
  };
// UPDATE-USER
export const updateUser = (updates) => ({
  type: 'UPDATE-USER',
  updates:updates
});

export const startUpdateUser= (updates={}) => {
  return (dispatch) => {
    const {
      id='nouser',
      fullName='',
      contactNo= "Not added",
      address ="Not added",
      img=""
      } = updates;
    console.log(updates)
    firebase.storage().ref(`/Images/${updates.id}/${new Date().getTime()}`).put(img)
                .then((snap) => {
                  updates.img = snap.metadata.downloadURLs[0];
                  firebase.database().ref(`Users/${updates.id}`).update(updates).then(() => {
                    dispatch(updateUser(updates));
                    alert("Your Profile has updated !")
                  })
                })
                .catch((error) => {
                    console.log(error);
              });
  };
};
