<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    // for ease of testing, should be deleted as we implement main page
    onMount(async () => {
        await goto('/login');
    })
</script>