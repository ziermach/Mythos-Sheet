<script lang="ts">
	import { Router, Link } from "@jamen/svelte-router";
	import CreateCharacter from "./pages/CreateCharacter.svelte";
	import Overview from "./pages/Overview.svelte";
	import Sheet from "./pages/Sheet.svelte";

	const routes = {
		"": Overview,
		"/": Overview,
		"/create": CreateCharacter,
		"/view": Sheet,
	};
</script>

<nav>
	<Link href="">Home</Link>
	<Link href="/create">Create</Link>
</nav>

<Router {routes} />
