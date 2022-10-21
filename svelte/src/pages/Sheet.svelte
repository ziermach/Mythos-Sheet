<script lang="ts">
    import CharacterSheet from "../components/CharacterSheet.svelte";
    import { router } from "@jamen/svelte-router";

    export let characterName: string = $router.query.characterName;

    function handleChange() {}
</script>

<CharacterSheet on:change={() => handleChange()} {characterName} />
