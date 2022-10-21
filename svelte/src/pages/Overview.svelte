<script lang="ts">
    import { Link, navigate } from "@jamen/svelte-router";
    import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
    import IconButton from "@smui/icon-button";
    import { onMount } from "svelte";
    import { IPCClient } from "../ipcClient";

    let client: IPCClient;
    let loadCharacterNamesPromise: Promise<string[]>;
    onMount(() => {
        client = new IPCClient();
        loadCharacterNamesPromise = loadCharacterNames();
    });

    async function loadCharacterNames() {
        console.debug("list names");
        return await client.listCharacterNames();
    }
    function openCharacter(name: string) {
        navigate(`/view?characterName=${name}`);
    }

    async function deleteCharacter(name: string) {
        await client.deleteCharacter(name);
        loadCharacterNamesPromise = loadCharacterNames();
    }
</script>

<h1>Characters</h1>
{#if loadCharacterNamesPromise}
    {#await loadCharacterNamesPromise}
        <p>...waiting</p>
    {:then characterNames}
        {#if characterNames.length}
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
                                    {name}
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
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
{/if}

<Link href={`/create`}>Add new</Link>
