<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Avatar, ProgressRadial } from "@skeletonlabs/skeleton";
  import { afterUpdate } from "svelte";
  let dataLoaded = false;

  afterUpdate(() => {
    dataLoaded = true;
  });

  const getNameInitials = (name) => {
    const names = name.split(" ");
    let initials = "";
    names.forEach((n) => {
      initials += n[0];
    });
    return initials;
  };
</script>

{#if !dataLoaded}
  <!--Server response time can be quite inconsistent. This should be considered for all pages-->
  <ProgressRadial class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
{/if}

{#if data.candidates}
  <div
    class="grid grid-cols-1 md:grid-cols-2 landscape:xl:grid-cols-3 md:gap-2 lg:gap-4 overflow-scroll"
  >
    {#each data.candidates as candidate}
      <div class="card mx-10 my-10 card-hover">
        <header class="card-header flex justify-center">
          <Avatar
            src={candidate.img}
            width="w-32"
            rounded="rounded-full"
            initials={getNameInitials(candidate.name)}
          />
        </header>
        <section class="p-4 text-center text-xl">{candidate.name}</section>
        <footer class="card-footer text-center">{candidate.message}</footer>
      </div>
    {/each}
  </div>
{/if}
