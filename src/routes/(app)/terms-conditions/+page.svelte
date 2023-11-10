<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>
<br>
<h1 class="flex justify-center text-xl"><b>{data.title}</b></h1>
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