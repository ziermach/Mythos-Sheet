<script lang="ts">
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
	import { createEventDispatcher } from 'svelte';
    export let numberOfBubbels: number;
    export let count;
    export let selected = Array.from(Array(count).keys());
    export let label: string;

    const dispatch = createEventDispatcher<{change: void}>();

    const handleChange = () => dispatch('change');
</script>

<h2>{label}</h2>
<div>
    {#each Array(numberOfBubbels) as _, i}
    <FormField>
        <Checkbox
        bind:group={selected}
        value={i}
        disabled={(i < selected.length - 1 || !(i - 1 in selected)) && i !== 0}
        on:change={() => {count = selected.length; handleChange();}}
        />
        <span slot="label">{i}</span>
    </FormField>
    {/each}
</div>

