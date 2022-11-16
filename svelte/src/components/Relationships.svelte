<script lang="ts">
    import type { Relationship } from "../model/character";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import FormField from "@smui/form-field";
    import IconButton from "@smui/icon-button";
    import { createEventDispatcher } from "svelte";

    export let relationships: Relationship[];
    export let editMode: boolean;
    const dispatch = createEventDispatcher<{ change: void }>();
    const handleChange = () => dispatch("change");

    function addNewRelationship() {
        console.log(relationships);
        relationships = [...relationships, { description: "", personName: "" }];
        handleChange();
    }

    function removeRelationship(index: number) {
        relationships.splice(index, 1);
        relationships = [...relationships];
        handleChange();
    }
</script>

<h2>Relationships</h2>
{#each relationships as relationship, i}
    <div>
        <Textfield
            disabled={!editMode}
            label="Person"
            variant="outlined"
            bind:value={relationship.personName}
            on:change={() => handleChange()}
        />
        <Textfield
            disabled={!editMode}
            label="Relation"
            textarea
            variant="outlined"
            bind:value={relationship.description}
            on:change={() => handleChange()}
        />
        {#if editMode}
            <IconButton
                class="material-icons"
                on:click={() => removeRelationship(i)}
            >
                delete
            </IconButton>
        {/if}
    </div>
{/each}
{#if editMode}
    <Button on:click={() => addNewRelationship()}>
        <Label>Add new Relationship</Label>
    </Button>
{/if}
