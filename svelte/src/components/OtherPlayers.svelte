<script lang="ts">
    import {
        ProfessionEnum,
        type Player,
        type Relationship,
    } from "../model/character";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import Card from "@smui/card/src/Card.svelte";
    import { Content } from "@smui/card";
    import Select, { Option } from "@smui/select";
    import IconButton from "@smui/icon-button";
    import { createEventDispatcher } from "svelte";
    import { firstLetterUpcase } from "../utillity";

    export let otherPlayers: Player[];

    const dispatch = createEventDispatcher<{ change: void }>();
    const handleChange = () => dispatch("change");

    function addPlayer() {
        otherPlayers = [
            ...otherPlayers,
            {
                characterName: "",
                playedBy: "",
                profession: ProfessionEnum.INVESTIGATOR,
            } as Player,
        ];
        handleChange();
    }
    function removePlayer(index: number) {
        otherPlayers.splice(index, 1);
        otherPlayers = [...otherPlayers];
        handleChange();
    }
</script>

<Card>
    <Content>
        <h2 class="mdc-typography--headline6">Other Players</h2>
        {#each otherPlayers as otherPlayer, i}
            <div>
                <Textfield
                    label="Character Name"
                    variant="outlined"
                    bind:value={otherPlayer.characterName}
                    on:change={() => handleChange()}
                />
                <Textfield
                    label="Played By"
                    variant="outlined"
                    bind:value={otherPlayer.playedBy}
                    on:change={() => handleChange()}
                />
                <Select
                    on:change={() => handleChange()}
                    bind:value={otherPlayer.profession}
                    label="Profession"
                >
                    {#each Object.values(ProfessionEnum) as profession}
                        <Option value={profession}
                            >{firstLetterUpcase(profession)}</Option
                        >
                    {/each}
                </Select>
                <IconButton
                    class="material-icons"
                    on:click={() => removePlayer(i)}
                >
                    delete
                </IconButton>
            </div>
        {/each}
        <Button on:click={() => addPlayer()}>
            <Label>Add new Player</Label>
        </Button>
    </Content>
</Card>
