<script lang="ts">
    import Checkbox from "@smui/checkbox";
    import FormField from "@smui/form-field";
    import { createEventDispatcher } from "svelte";
    import type { GameMove } from "../model/character";

    export let editMode: boolean;
    export let move: GameMove;

    const dispatch = createEventDispatcher<{ change: void }>();

    const handleChange = () => dispatch("change");
</script>

<FormField>
    {#if editMode}
        <Checkbox on:change={() => handleChange()} bind:checked={move.active} />
    {/if}
    <h3>{move.name}</h3>
</FormField>
<div class="move-desc">{move.description}</div>
