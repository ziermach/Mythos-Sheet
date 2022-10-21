<script lang="ts">
    import { Link, navigate } from "@jamen/svelte-router";
    import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
    import IconButton from "@smui/icon-button";
    import { onMount } from "svelte";
    import { IPCClient } from "../ipcClient";

    let client: IPCClient;
    let characterNames: string[] = [];
    onMount(async () => {
        client = new IPCClient();
        await loadCharacterNames();
    });

    async function loadCharacterNames() {
        characterNames = await client.listCharacterNames();
    }
    function openCharacter(name: string) {
        navigate(`/view?characterName=${name}`);
    }

    async function deleteCharacter(name: string) {
        await client.deleteCharacter(name);
        await loadCharacterNames();
    }
</script>

<h1>Characters</h1>
{#if characterNames?.length > 0}
    <DataTable
        table$aria-label="Characters list"
        style="width: 100%; margin: 1vw"
    >
        <Head>
            <Row>
                <Cell>Name</Cell>
                <Cell>Actions</Cell>
            </Row>
        </Head>
        <Body>
            {#each characterNames as name}
                <Row>
                    <Cell>
                        <Link href={`/view?characterName=${name}`}>
                            {name}.json
                        </Link>
                    </Cell>
                    <Cell>
                        <IconButton
                            class="material-icons"
                            on:click={() => deleteCharacter(name)}
                        >
                            delete
                        </IconButton>
                        <IconButton
                            class="material-icons"
                            on:click={() => openCharacter(name)}
                        >
                            visibility
                        </IconButton>
                    </Cell>
                </Row>
            {/each}
        </Body>
    </DataTable>
{/if}

<Link href={`/create`}>Add new</Link>
