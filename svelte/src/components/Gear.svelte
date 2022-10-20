<script lang="ts">
    import Button, { Label } from '@smui/button';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';
	import { createEventDispatcher } from 'svelte';
    import type { Gear } from '../model/character';

    export let inventar: Gear[];
    function addGear () {
        inventar = [...inventar, {name: '', count: 1}];
        handleChange();
    }
    function removeGear (index: number) {
        inventar.splice(index, 1);
        inventar = [...inventar];
        handleChange();
    }

    const dispatch = createEventDispatcher<{change: void}>();

    const handleChange = () => dispatch('change');
</script>

<h2>Gear</h2>

<div>
    {#each inventar as gear, i}
    <div>
        <Textfield
        style="max-width: 5vw; width: 5vw; min-width: 5vw"
        type="number"
        bind:value={gear.count}
        on:change={() => handleChange()}
        /> 
        <Textfield
        style="width: 25vw;"
        variant="outlined"
        bind:value={gear.name}
        on:change={() => handleChange()}
        />    
        <IconButton class="material-icons" on:click={() => removeGear(i)}>
            delete
        </IconButton>
    </div>
    {/each}
</div>
<Button on:click={() => addGear()}>
    <Label>
        Add Gear
    </Label>
</Button>

