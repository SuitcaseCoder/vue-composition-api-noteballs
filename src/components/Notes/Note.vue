<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column"> {{ dateFormatted }} </small>
          <small class="column has-text-right"> {{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/editNote/${note.id}`"
        class="card-footer-item"
        href="#"
      >
        Edit
      </RouterLink>
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
      >
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
/* imports */
import { useDateFormat } from '@vueuse/core'
import { computed, reactive } from "vue";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";


/* props */
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/* stores */
const storeNotes = useStoreNotes();

/* date formatted */
const dateFormatted = computed(() => {
  // this converts timestamp into proper date object
  let date = new Date(parseInt(props.note.date))
  let formattedDate = useDateFormat(date, 'MM-DD-YYYY @ HH:MM')
  return formattedDate.value

})

/* character length */
const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

/* modals */

const modals = reactive({
  deleteNote: false,
  // editNote: false
});
</script>