<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-2 lg:p-10 w-3/4">
<h1 style="font-size:20px ;"><b>{data.title}</b></h1>
<br><br>
<div>{@html data.content}</div>
</div>