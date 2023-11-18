<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>
<svelte:head>
	<title>Terms and Conditions | FP Voter</title>
</svelte:head>
<br>
<h3 class="h3 flex justify-center"><b>{data.title}</b></h3>
<div class="w-full flex justify-center text-justify p-4 lg:p-10">
<div>
	{#each data.content as paragraph}
		<b>{paragraph.subtitle}</b>
		<div class="px-4">
			<br>
			{#each paragraph.subcontent as subcontent}
				<li>{subcontent}</li>
			{/each}
		</div>
		<br>
	{/each}
</div>
</div>