<script>
  import { Table, tableMapperValues, tableSourceValues } from '@skeletonlabs/skeleton';
  export let data;
  const dataSource = data.result.results || [];
  const totalAmountOfVotes = data.result.votes || 0;
  const publishDate = new Date("December 8, 2023 13:45:00").getTime();
  let remainingTime = publishDate - Date.now();
  let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  const cdTimer = setInterval(() => {
    const now = Date.now();
    remainingTime = publishDate - now;
    days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (remainingTime <= 0) {
      clearInterval(cdTimer);
    }
  }, 1000);

  const tableSource = {
    // A list of heading labels.
    head: ['Candidate', 'Votes received', 'Votes percentage'],
    // The data visibly shown in your table body UI.
    body: tableMapperValues(dataSource, ['name', 'votesReceived', 'votesPercentage']),
    foot: [`<code class="code">${dataSource.length} candidates</code`, `<code class="code">${totalAmountOfVotes} votes</code>`, `<code class="code">100%</code>`]
  };
</script>
<svelte:head>
  <title>Results | FP Voter</title>
</svelte:head>
<div
  class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 lg:p-10 w-full lg:w-3/4"
>
  {#if remainingTime > 0}
    <h2 class="h2 text-center">
      Results will be published in {days > 0 ? `${days}d ` : ""}{hours > 0
        ? `${hours}h `
        : ""}{minutes > 0 ? `${minutes}m ` : ""}{seconds > 0 ? `${seconds}s` : ""}
    </h2>
  {:else}
    <h2 class="h2 text-center">
      <b>Election results are here 🎉🎉</b> 
    </h2><br><br>
  <Table source={tableSource} />
  {/if}
</div>
