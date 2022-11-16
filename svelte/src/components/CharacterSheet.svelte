<script lang="ts">
    import Button from "@smui/button/src/Button.svelte";
    import Card, { Content } from "@smui/card";
    import Label from "@smui/list/src/Label.svelte";
    import Textfield from "@smui/textfield";
    import { onMount } from "svelte";
    import * as yup from "yup";
    import { IPCClient } from "../ipcClient";
    import type { Character } from "../model/character";
    import { firstLetterUpcase } from "../utillity";
    import Attributes from "./Attributes.svelte";
    import Gear from "./Gear.svelte";
    import Injuries from "./Injuries.svelte";
    import Moves from "./MoveList.svelte";
    import Notes from "./Notes.svelte";
    import OtherPlayers from "./OtherPlayers.svelte";
    import Passion from "./Passion.svelte";
    import PdfExport from "./PDFExport.svelte";
    import Relationships from "./Relationships.svelte";

    export let characterName: string;
    export let editMode = false;
    $: character.name = characterName;
    let ipcClient = new IPCClient();

    const schema = yup.object().shape({
        name: yup.string().nullable().required(),
    });

    function save() {
        console.debug("saveCharacter", character);
        ipcClient.saveCharacter(character);
    }

    const handleChange = () => {
        console.debug("change detected");
        save();
    };

    let character: Character = {
        name: "",
        experiencePoints: 0,
        passions: [],
        assets: 0,
        attributes: {
            dexterity: 0,
            empathy: 0,
            intelligence: 0,
            strength: 0,
            willpower: 0,
        },
        gameMoves: [],
        gear: [],
        injuries: [],
        disorders: [],
        look: "",
        otherPlayers: [],
        profession: null,
        relationships: [],
        reputation: 0,
        player: {
            playedBy: "",
        },
        notes: "",
    };

    onMount(async () => {
        ipcClient = new IPCClient();
        const response = await ipcClient.readCharacter(characterName);
        console.debug("got response", response);
        character = { ...character, ...response };
        console.debug("character", character);
    });
</script>

{#if character.profession}
    <Card>
        <Content>
            <h1>{firstLetterUpcase(character.profession.name)} foo</h1>
            {#if editMode}
                <PdfExport name={character.name} />
            {/if}

            <Button on:click={() => (editMode = !editMode)}>
                <Label>Edit {editMode ? "off" : "on"}</Label>
            </Button>

            <div style="width: 35vw;text-align: center; margin: 2vw">
                {character.profession.description}
            </div>
            <Textfield
                disabled={true}
                style="min-width: 40vw;"
                label={"Name"}
                variant="outlined"
                bind:value={character.name}
                on:change={() => handleChange()}
            />

            <Textfield
                disabled={!editMode}
                style="min-width: 40vw;"
                label={"Look"}
                variant="outlined"
                bind:value={character.look}
                on:change={() => handleChange()}
            />

            <Passion
                bind:editMode
                bind:passions={character.passions}
                on:change={() => handleChange()}
            />

            <Relationships
                bind:editMode
                bind:relationships={character.relationships}
                on:change={() => handleChange()}
            />

            <OtherPlayers
                bind:editMode
                bind:otherPlayers={character.otherPlayers}
                on:change={() => handleChange()}
            />

            <Attributes
                bind:editMode
                bind:attributes={character.attributes}
                on:change={() => handleChange()}
            />

            <div>
                <Textfield
                    style="min-width: 25vw;"
                    disabled={!editMode}
                    label={firstLetterUpcase("assets")}
                    type="number"
                    bind:value={character.assets}
                    max={10}
                    min={0}
                    input$min={0}
                    input$max={10}
                    on:change={() => {
                        handleChange();
                    }}
                />

                <Textfield
                    style="min-width: 25vw;"
                    disabled={!editMode}
                    label={firstLetterUpcase("reputation")}
                    type="number"
                    bind:value={character.reputation}
                    max={10}
                    min={0}
                    input$min={0}
                    input$max={10}
                    on:change={() => {
                        handleChange();
                    }}
                />
            </div>

            <Gear
                bind:editMode
                bind:inventar={character.gear}
                on:change={() => handleChange()}
            />

            <Injuries
                bind:editMode
                bind:injuries={character.injuries}
                label="Injury"
                on:change={() => handleChange()}
            />

            <Injuries
                bind:editMode
                bind:injuries={character.disorders}
                label="Disorder"
                on:change={() => handleChange()}
            />

            <Textfield
                disabled={!editMode}
                label={firstLetterUpcase("experiencePoints")}
                type="number"
                bind:value={character.experiencePoints}
                max={10}
                min={0}
                input$min={0}
                input$max={10}
                style="width: 10vw;"
                on:change={() => {
                    handleChange();
                }}
            />

            <Moves
                bind:editMode
                moves={character.profession.professionMoves.available}
                professionMoves={character.profession.professionMoves.starter}
                on:change={() => handleChange()}
            />

            <Notes
                bind:editMode
                bind:notes={character.notes}
                on:change={() => handleChange()}
            />
        </Content>
    </Card>
{:else}
    <p>no profession selected!</p>
{/if}
