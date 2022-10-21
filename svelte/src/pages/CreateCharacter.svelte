<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Card, { Content } from "@smui/card";
    import Select, { Option } from "@smui/select";
    import Textfield from "@smui/textfield";
    import { onMount } from "svelte";
    import { navigate } from "@jamen/svelte-router";
    import { Professions } from "../data/profession";
    import { IPCClient } from "../ipcClient";
    import { ProfessionEnum, type Character } from "../model/character";
    import { firstLetterUpcase } from "../utillity";
    let name: string = "";
    let selectedProfession: ProfessionEnum = ProfessionEnum.INVESTIGATOR;

    let client: IPCClient;
    onMount(async () => {
        client = new IPCClient();
    });

    async function addCharacter() {
        console.debug(selectedProfession);
        const profession = Professions.get(selectedProfession);
        console.debug(`create character`, {
            name,
            profession,
        });
        await client.saveCharacter({
            name,
            gear: profession.starterGear,
            assets: profession.startAssets,
            passions: profession.passions,
            relationships: profession.relationsShips,
            profession,
        } as Partial<Character>);
        navigate(`/view?characterName=${name}`);
    }
</script>

<Card>
    <Content>
        <Textfield
            label="Name"
            variant="outlined"
            type="string"
            bind:value={name}
            required
        />

        <Select bind:value={selectedProfession} label="Profession">
            {#each Object.values(ProfessionEnum) as profession}
                <Option value={profession}
                    >{firstLetterUpcase(profession)}</Option
                >
            {/each}
        </Select>

        <Button on:click={() => addCharacter()}>
            <Label>Add</Label>
        </Button>
    </Content>
</Card>
