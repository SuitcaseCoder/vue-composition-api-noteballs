import { watch } from 'vue'

export function useWatchCharacters(valueToWatch){

    /* watch characters */
watch(valueToWatch, (newValue, maxChars = 100) => {
    if (newValue.length === maxChars){
        alert(`Only ${maxChars} characters allowed`)
    }
})
}