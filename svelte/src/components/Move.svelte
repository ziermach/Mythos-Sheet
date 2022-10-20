<script lang="ts">
	import Checkbox from "@smui/checkbox";
	import FormField from "@smui/form-field";
	import { createEventDispatcher } from "svelte";
	import type { GameMove } from "../model/character";

    export let move: GameMove;

    const dispatch = createEventDispatcher<{change: void}>();

    const handleChange = () => dispatch('change');

</script>

<FormField>
    <Checkbox on:change={() => handleChange()} bind:checked={move.active}/>
    <h3>{move.name}</h3>
</FormField>
<div style="max-width: 30vw; text-align: center;">{move.description}</div>
