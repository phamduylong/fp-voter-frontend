<script>
	import { page } from '$app/stores';
    import { alertState } from "$lib/alertStore.js";
    alertState.show($page.error.message, "error");
</script>

<h1>{$page.error.message}</h1>