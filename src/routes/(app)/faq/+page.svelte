<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
</script>

<h1 class="h1 text-xl flex justify-center p-4 lg:p-0 lg:pt-8"><b>{data.title}</b></h1>
<div class="lg:p-10 lg:w-3/4 lg:relative lg:top-1/2 lg:left-1/2 lg: lg:-translate-x-1/2 lg:-translate-y-1/2">
  <div>
    <Accordion class="mb-10 px-10">
      {#each data.content as pair}
        <AccordionItem class="card card-hover p-2">
		  <svelte:fragment slot="lead"><i class="fa fa-info-circle"></i></svelte:fragment>
          <svelte:fragment slot="summary"><b>{pair.q}</b></svelte:fragment>
          <svelte:fragment slot="content"
            ><p class="p-2 text-justify">{pair.a}</p></svelte:fragment
          >
        </AccordionItem>
      {/each}
    </Accordion>
  </div>
</div>
