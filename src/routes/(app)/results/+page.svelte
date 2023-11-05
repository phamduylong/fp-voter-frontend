<script>
  const publishDate = new Date("January 1, 2024 00:00:00").getTime();
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
</script>

<div
  class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 lg:p-10 w-3/4"
>
  {#if remainingTime > 0}
    <h2 class="h2">
      Results will be published in {days > 0 ? `${days}d ` : ""}{hours > 0
        ? `${hours}h `
        : ""}{minutes > 0 ? `${minutes}m ` : ""}{seconds > 0 ? `${seconds}s` : ""}
    </h2>
  {/if}
</div>
