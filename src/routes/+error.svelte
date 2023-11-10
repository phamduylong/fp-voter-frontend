<script>
	import { page } from '$app/stores';
    import { alertState } from "$lib/alertStore.js";
    alertState.show($page.error.message.body.message, "error");
</script>