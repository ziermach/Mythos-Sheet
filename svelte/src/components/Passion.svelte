<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Checkbox from "@smui/checkbox";
    import IconButton from "@smui/icon-button";
    import Textfield from "@smui/textfield";
    import { createEventDispatcher } from "svelte";
    import type { Passion } from "../model/character";
    export let editMode: boolean;
    export let passions: Passion[];
    function addPassion() {
        passions = [...passions, { active: true, name: "" }];
        handleChange();
    }
    function removePassion(index: number) {
        passions.splice(index, 1);
        passions = [...passions];
        handleChange();
    }

    const dispatch = createEventDispatcher<{ change: void }>();

    const handleChange = () => dispatch("change");
</script>

<h2>Passion</h2>
{#each passions as passion, i}
    <div>
        {#if editMode}
            <Checkbox
                on:change={() => handleChange()}
                bind:checked={passion.active}
            />
        {/if}
        <Textfield
            disabled={!editMode}
            textarea
            bind:value={passion.name}
            on:change={() => handleChange()}
        />
        {#if editMode}
            <IconButton
                class="material-icons"
                on:click={() => removePassion(i)}
            >
                delete
            </IconButton>
        {/if}
    </div>
{/each}
{#if editMode}
    <Button on:click={() => addPassion()}>
        <Label>Add Passion</Label>
    </Button>
{/if}
