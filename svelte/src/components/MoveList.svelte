<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { GameMove } from "../model/character";
    import Move from "./Move.svelte";

    export let editMode: boolean;
    export let professionMoves: GameMove[] = [];
    export let moves: GameMove[];

    const dispatch = createEventDispatcher<{ change: void }>();
    const handleChange = () => dispatch("change");

    function filterInactiveWhenEditMode(moves: GameMove[]) {
        if (editMode) {
            return moves;
        }
        return moves.filter((move) => move.active);
    }
</script>

<h2>Proffesion Moves</h2>
{#each filterInactiveWhenEditMode(professionMoves) as move}
    <Move bind:editMode on:change={() => handleChange()} bind:move />
{/each}

<h2>All Moves</h2>
{#each filterInactiveWhenEditMode(moves) as move}
    <Move bind:editMode on:change={() => handleChange()} bind:move />
{/each}
