<script>
    export let data;
    import PersonCard from "$lib/components/PersonCard.svelte";
</script>
<svelte:head>
    <title>Home | FP Voter</title>
</svelte:head>
{#if data.candidate}
    <div class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/3">
        <h3 class="h3 text-center"><b>Your voted for 🎉</b></h3>
        <PersonCard person={data.candidate} editable={false} />
    </div>
{:else}
    <div class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/3">
        <h3 class="h3 text-center"><b>Seems like you have not voted yet 🧐</b></h3>
    </div>
{/if}