<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>
<br>
<h3 class="flex justify-center h3"><b>{data.title}</b></h3>
<br>
<div class="text-justify w-full p-4 lg:p-10">
	<i class="fa fa-calendar"></i>&nbsp;<b>Last updated:</b> 9.11.2023<br><br>
	Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
	<br><br>
	PiNKK Finger Print Voting System is committed to protecting your personal information and being transparent about how we use it. This privacy policy 
	explains what data we collect, how we use it, and your choices regarding your information.
	<br><br>
	{#each data.content as paragraph}
		<i class="fa fa-info-circle"></i>&nbsp;<b>{paragraph.subtitle}</b>
		{#if paragraph.subcontent}
			<p class="p-4 lg:p-6">{paragraph.subcontent}</p>
		{/if}
	{/each}
</div>