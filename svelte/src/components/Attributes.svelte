<script lang="ts">
	import type { Attributes } from "../model/character";
    import Textfield from '@smui/textfield';
    import FormField from '@smui/form-field';
	import { createEventDispatcher } from "svelte";

    export let attributes: Attributes;
    const dispatch = createEventDispatcher<{change: void}>();

    const handleChange = () => dispatch('change');
</script>

<FormField>
    {#each Object.keys(attributes) as attribute}
        <Textfield
            style="width: 5vw; min-width: 5vw; margin: 0.5vw"
            label={attribute.slice(0,3)}
            variant="outlined"
            type="number"
            bind:value={attributes[attribute]}
            on:change={() => handleChange()}
        />
    {/each}
</FormField>

