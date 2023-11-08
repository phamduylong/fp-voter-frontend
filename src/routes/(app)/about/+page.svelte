<script>
    import PersonCard from "$lib/components/PersonCard.svelte";
    const devs = [
        {name: "Long Pham", message: "IT Student MetropoliaUAS & Junior Software Developer at Digia Oy 🇫🇮", img: "https://avatars.githubusercontent.com/u/69810988?v=4"},
        {name: "Jaakko Nahkala", message:"Third year engineer student at Metropolia UAS. Specializing in embedded systems. Passionate about efficient low level programming, signal processing and FPGAs.", img: "https://avatars.githubusercontent.com/u/74764860?v=4"},
        {name: "Kendrick Kwong", message:"^_^", img: "https://avatars.githubusercontent.com/u/113900048?v=4"},
        {name: "Niklas K", message: "", img: "https://avatars.githubusercontent.com/u/75478901?v=4"},
        {name: "Kikani Parth", message: "Studying IT Engineering at Metropolia University of Applied Sciences, Finland.", img: "https://avatars.githubusercontent.com/u/99806873?v=4"}
    ]
</script>

<div
class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 landscape:xl:grid-cols-3 md:gap-2 lg:gap-4 overflow-scroll"
>
{#each devs as person}
  <PersonCard  {person} editable={false}/>
{/each}
</div>