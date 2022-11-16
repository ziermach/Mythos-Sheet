<script lang="ts">
    import Button, { Label } from "@smui/button";
    import { onMount } from "svelte";
    import { IPCClient } from "../ipcClient";
    export let name: string;

    let ipcClient = new IPCClient();

    onMount(async () => {
        ipcClient = new IPCClient();
    });

    function savePDF() {
        ipcClient.printPDF(name);
    }
</script>

<Button on:click={() => savePDF()}>
    <Label>Save as PDF</Label>
</Button>
