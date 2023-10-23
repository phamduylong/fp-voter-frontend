<script>
	/** @type {import('./$types').PageData} */
	export let data;
    import { Avatar } from '@skeletonlabs/skeleton';

    const getNameInitials = (name) => {
        const names = name.split(' ');
        let initials = '';
        names.forEach((n) => {
            initials += n[0];
        });
        return initials;
    };
</script>

<h1 class="h1 absolute top-6 md:top-8 lg:top-12 left-1/2 -translate-x-1/2 -translate-y-1/2">Candidates</h1>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-4 w-3/4 h-3/4 overflow-scroll">
    {#if data.candidates}
        {#each data.candidates as candidate}
            <div class="card inline-block mx-6 my-6 card-hover">
                <header class="card-header flex justify-center">
                    <Avatar src={candidate.img} width="w-32" rounded="rounded-full" initials={getNameInitials(candidate.name)}/>
                </header>
                <section class="p-4 text-center">{candidate.name}</section>
                <footer class="card-footer text-center">{candidate.message}</footer>
            </div>
        {/each}
    {/if}
</div>