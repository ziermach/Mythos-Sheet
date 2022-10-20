<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Select, { Option } from "@smui/select";
    import Textfield from "@smui/textfield";
    import IconButton from "@smui/icon-button";

    import { firstLetterUpcase } from "../utillity";
    import { createEventDispatcher } from "svelte";
    import type { Injuries } from "../model/character";
    import type { InjurieStrength } from "../model/character";
    export let label: string;
    export let injuries: Injuries[];
    function addInjury() {
        injuries = [...injuries, { name: "", strength: InjurieStrength.EASY }];
        handleChange();
    }
    function removeInjury(index: number) {
        injuries.splice(index, 1);
        injuries = [...injuries];
        handleChange();
    }

    const dispatch = createEventDispatcher<{ change: void }>();

    const handleChange = () => dispatch("change");
</script>

<h2>{label}</h2>

<div>
    {#each injuries as injury, i}
        <div>
            <Textfield
                style="min-width: 25vw;"
                type="text"
                bind:value={injury.name}
                on:change={() => handleChange()}
            />
            <Select
                on:change={() => handleChange()}
                bind:value={injury.strength}
            >
                {#each Object.values(InjurieStrength) as strength}
                    <Option>{firstLetterUpcase(strength)}</Option>
                {/each}
            </Select>
            <IconButton class="material-icons" on:click={() => removeInjury(i)}>
                delete
            </IconButton>
        </div>
    {/each}
</div>
<Button on:click={() => addInjury()}>
    <Label>
        Add {label}
    </Label>
</Button>
