<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Avatar } from "@skeletonlabs/skeleton";

  const getNameInitials = (name) => {
    const names = name.split(" ");
    let initials = "";
    names.forEach((n) => {
      initials += n[0];
    });
    return initials;
  };
</script>

<div
  class="min-w-full min-h-full !overflow-visible"
>
  {#if data.candidates}
    <div
      class="grid grid-cols-1 md:grid-cols-2 landscape:lg:grid-cols-3 md:gap-2 lg:gap-4 w-full lg:landscape:w-3/4 absolute 
      lg:portrait:top-[40%] top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:portrai:h-1/2 h-3/4"
    >
    <h1 class="h1 absolute -top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2">Candidates</h1>
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
</div>
