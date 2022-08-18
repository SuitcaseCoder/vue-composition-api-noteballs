import { defineStore } from 'pinia'
import { 
    collection, onSnapshot,
    doc, deleteDoc, updateDoc, addDoc,
    query, orderBy 
} from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from './storeAuth'


let notesCollectionRef 
let notesCollectionQuery 

let getNotesSnapshot = null


export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [
            // {
            //     id: 'id1',
            //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita repellendus quod cumque recusandae velit?'   
            // },
            // {
            //     id: 'id2',
            //     content: 'This is a shorter note'   
            // }
        ],
        notesLoaded: false
     }
  },
  actions: {
    init(){
        const storeAuth = useStoreAuth()

        notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
        notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
        //initialize our db refs
        this.getNotes()
    },
    async getNotes(){
        this.notesLoaded = false

        /* get realtime data from db */
        getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
            let notes = []
            querySnapshot.forEach((doc) => {
                let note = {
                id: doc.id,
                content: doc.data().content,
                date: doc.data().date
            }
            notes.push(note)
            })
            this.notes = notes
            this.notesLoaded = true
          }, error => {
            console.log('error.message: ', error.message)
          })
          
    },
    clearNotes(){
        this.notes = []
        if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener
    },
    async addNote(newNoteContent){
        let currentDate = new Date().getTime()
        let date = currentDate.toString()

        // Add a new document with a generated id.
        await addDoc(notesCollectionRef, {
            content: newNoteContent,
            date: date
        });

    },
    async deleteNote(idToDelete){
        await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id, content){
        await updateDoc(doc(notesCollectionRef, id), {
            content: content
        })
    }
  },
  getters: {
    getNoteContent: (state) => {
        return (id) => {
            return state.notes.filter(note => {
                return note.id === id
            })[0].content
        }
    },
    totalNotesCount: (state) => {
        return state.notes.length
    },
    totalCharactersCount: (state) => {
        let count = 0;
        state.notes.forEach(note => {
            count += note.content.length
        })
        return count
    }
  }
})