<script>
    import {afterUpdate} from "svelte";

    export let data;
    import PersonCard from "$lib/components/PersonCard.svelte";
    import {ProgressRadial} from "@skeletonlabs/skeleton";
    $: devs = data.contributors;
</script>
<svelte:head>
    <title>About Us | FP Voter</title>
</svelte:head>
{#if (devs && devs.length)}
    <div
            class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 landscape:xl:grid-cols-3 md:gap-2 lg:gap-4 overflow-scroll"
    >
        {#if devs && devs.length}
            {#each devs as dev}
                <PersonCard person={dev} editable={false}/>
            {/each}
        {/if}
    </div>
{:else }
    <ProgressRadial value={undefined} class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
{/if}