<script lang="ts">
	import { onMount } from "svelte";
	import Button, { Label } from "@smui/button";
	import CharacterSheet from "./components/CharacterSheet.svelte";
	import {
		ProfessionEnum,
		type Character,
		type Profession,
	} from "./model/character";
	import { Professions } from "./data/profession";
	export const prerender = true;

	let fileSystem: any;
	let characterNames: string[] = [];

	function listCharacterNames() {
		try {
			fileSystem.send("listCharacterNames");
			fileSystem.receive("listCharacterNames", (names: string[]) => {
				console.log(names);
				characterNames = names;
			});
		} catch (e) {
			console.error(e);
		}
	}

	function readCharacter(name: string) {
		try {
			fileSystem.send("readCharacter", { name });

			fileSystem.receive("readCharacter", (character: Character) => {
				console.log(character);
				character = { ...character };
			});
		} catch (e) {
			console.error(e);
		}
	}
	onMount(() => {
		try {
			fileSystem =
				globalThis["ipc" as keyof typeof globalThis]["fileSystem"];
		} catch (error) {
			console.error(error);
			fileSystem = null;
		}
		listCharacterNames();
	});

	const selectedProfession: Profession | undefined = Professions.has(
		ProfessionEnum.INVESTIGATOR
	)
		? Professions.get(ProfessionEnum.INVESTIGATOR)
		: undefined;
	let character: Character;

	function handleChange() {
		console.log(character);
		saveCharacter();
	}

	function saveCharacter() {
		const data = {
			character: JSON.stringify(character),
		};
		try {
			fileSystem.send("saveCharacter", data);
		} catch (e) {
			console.error(e);
		}
	}
</script>

{#each characterNames as name}
	<Button on:click={() => readCharacter(name)}>
		<Label>{name}</Label>
	</Button>
{/each}
<CharacterSheet
	bind:character
	profession={selectedProfession}
	on:change={() => handleChange()}
/>
