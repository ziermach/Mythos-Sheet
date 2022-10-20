
<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { GameMove } from "../model/character";
	import Move from "./Move.svelte";


    export let professionMoves: GameMove[] = [];
    export let moves: GameMove[];

    const dispatch = createEventDispatcher<{change: void}>();
    const handleChange = () => dispatch('change');

</script>

<h2>Proffesion Moves</h2>
{#each professionMoves as move}
    <Move on:change={() => handleChange()} bind:move/>
{/each}

<h2>All Moves</h2>
{#each moves as move}
    <Move on:change={() => handleChange()} bind:move/>
{/each}