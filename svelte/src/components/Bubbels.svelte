<script lang="ts">
    import Checkbox from "@smui/checkbox";
    import FormField from "@smui/form-field";
    import { createEventDispatcher } from "svelte";
    export let numberOfBubbels: number;
    export let label: string;
    export let count;
    $: numberOfActive = selected.length - 1;
    $: selected = Array.from(Array(count).keys());
    const dispatch = createEventDispatcher<{ change: number }>();

    const handleChange = () => {
        dispatch("change", numberOfActive);
    };
</script>

<h2>{label}</h2>

count: {count} <br />
selected: {selected} <br />
selected.length: {selected.length} <br />
numberOfActive: {numberOfActive} <br />
<div>
    {#each Array(numberOfBubbels) as _, i}
        <FormField>
            <Checkbox
                bind:group={selected}
                value={i + 1}
                id="option_{i + 1}"
                disabled={i !== selected.length - 2 &&
                    i !== selected.length - 1}
                on:click={() => {
                    handleChange();
                }}
            />
            <span slot="label">{i + 1}</span>
        </FormField>
    {/each}
</div>
