<script lang="ts">
    import Textfield from "@smui/textfield";
    import { createEventDispatcher } from "svelte";

    export let notes: string;
    export let editMode: boolean;

    const dispatch = createEventDispatcher<{ change: void }>();
    const handleChange = () => dispatch("change");
</script>

<Textfield
    disabled={!editMode}
    style="height: fit-content"
    on:change={() => handleChange()}
    textarea
    label="notes"
    bind:value={notes}
/>
