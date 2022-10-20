<script lang="ts">
	import Textfield from "@smui/textfield";
	import { createEventDispatcher } from "svelte";

    export let notes: string
    
    const dispatch = createEventDispatcher<{change: void}>();
    const handleChange = () => dispatch('change');
</script>

<Textfield 
    on:change={() => handleChange()}
    textarea 
    label='notes'
    bind:value={notes}
/>