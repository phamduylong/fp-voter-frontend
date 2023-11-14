<script>
    import {afterUpdate} from "svelte";

    export let data;
    console.log(data);
    import PersonCard from "$lib/components/PersonCard.svelte";

    let devs = data.contributors;

    afterUpdate(() => {
      devs = data.contributors;
    });


</script>

<div
class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 landscape:xl:grid-cols-3 md:gap-2 lg:gap-4 overflow-scroll"
>
{#each devs as dev}
  <PersonCard person={dev} editable={false}/>
{/each}
</div>