import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [
            {
                id: 'id1',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita repellendus quod cumque recusandae velit?'   
            },
            {
                id: 'id2',
                content: 'This is a shorter note'   
            }
        ]
     }
  },
  actions: {
    addNote(newNoteContent){
        let currentDate = new Date().getTime()
        let id = currentDate.toString()

        let note = {
            id: id,
            content: newNoteContent.value
        }

        this.notes.unshift(note) 
    }
  }
})