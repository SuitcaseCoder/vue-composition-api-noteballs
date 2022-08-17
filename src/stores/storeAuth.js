import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/js/firebase'



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return{
        user: {}
    }
  },
  actions: {
    init(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user logged in: ', user)
                this.user.id = user.uid
                this.user.email = user.email
                this.router.push('/')
            // not sure where I got this next line from
            //   const uid = user.uid;
              // ...
            } else {
             this.user = {}
             this.router.replace('/auth')
            }
          });
    },
    registerUser(credentials){
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // console.log('error.message: ', error.message)
        });
    },
    loginUser(credentials){
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            const user = userCredential.user
            // console.log('user: ', user)
        })
        .catch((error) => {
            // console.log('errorMsg: ', error.message)
        });
    },
    logoutUser(){
        signOut(auth).then(() => {
            // console.log('User signed out')
          }).catch((error) => {
            // console.log('error: ', error.message)
          });
    }
  },

})