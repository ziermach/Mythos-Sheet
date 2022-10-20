<script lang="ts">
    import Card, { Content } from "@smui/card";
    import Textfield from "@smui/textfield";
    import { createEventDispatcher } from "svelte";
    import * as yup from "yup";
    import type { Character, Profession } from "../model/character";
    import { firstLetterUpcase } from "../utillity";
    import Attributes from "./Attributes.svelte";
    import Bubbels from "./Bubbels.svelte";
    import Gear from "./Gear.svelte";
    import Injuries from "./Injuries.svelte";
    import Moves from "./MoveList.svelte";
    import Notes from "./Notes.svelte";
    import OtherPlayers from "./OtherPlayers.svelte";
    import Relationships from "./Relationships.svelte";

    export let profession: Profession | undefined;
    const schema = yup.object().shape({
        name: yup.string().nullable().required(),
    });

    export const character: Character = {
        name: "",
        experiencePoints: 0,
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
        passion: "",
        profession: {
            description: "",
            name: "",
            professionMoves: {
                available: [],
                starter: [],
            },
        },
        relationships: [],
        reputation: 0,
        player: {
            playedBy: "",
        },
        notes: "",
    };

    const dispatch = createEventDispatcher<{ change: void }>();

    const handleChange = () => dispatch("change");
</script>

{#if profession}
    <Card>
        <Content>
            <h1>{firstLetterUpcase(profession.name)}</h1>
            <div style="width: 35vw;text-align: center; margin: 2vw">
                {profession.description}
            </div>
            <Textfield
                style="min-width: 25vw;"
                label={"Name"}
                variant="outlined"
                bind:value={character.name}
                on:change={() => handleChange()}
            />

            <Textfield
                style="min-width: 25vw;"
                label={"Look"}
                variant="outlined"
                bind:value={character.look}
                on:change={() => handleChange()}
            />

            <Textfield
                style="min-width: 25vw;"
                label={"Passion"}
                variant="outlined"
                bind:value={character.passion}
                on:change={() => handleChange()}
            />

            <Relationships
                bind:relationships={character.relationships}
                on:change={() => handleChange()}
            />

            <OtherPlayers
                bind:otherPlayers={character.otherPlayers}
                on:change={() => handleChange()}
            />

            <Attributes
                bind:attributes={character.attributes}
                on:change={() => handleChange()}
            />

            <Bubbels
                label={firstLetterUpcase("assets")}
                numberOfBubbels={10}
                bind:count={character.assets}
                on:change={() => handleChange()}
            />

            <Bubbels
                label={firstLetterUpcase("reputation")}
                numberOfBubbels={10}
                bind:count={character.reputation}
                on:change={() => handleChange()}
            />

            <Gear
                bind:inventar={character.gear}
                on:change={() => handleChange()}
            />

            <Injuries
                bind:injuries={character.injuries}
                label="Injury"
                on:change={() => handleChange()}
            />

            <Injuries
                bind:injuries={character.disorders}
                label="Disorder"
                on:change={() => handleChange()}
            />

            <Bubbels
                label={firstLetterUpcase("experiencePoints")}
                numberOfBubbels={10}
                bind:count={character.experiencePoints}
                on:change={() => handleChange()}
            />

            <Moves
                moves={profession.professionMoves.available}
                professionMoves={profession.professionMoves.starter}
                on:change={() => handleChange()}
            />

            <Notes
                bind:notes={character.notes}
                on:change={() => handleChange()}
            />
        </Content>
    </Card>
{:else}
    <p>no profession selected!</p>
{/if}
