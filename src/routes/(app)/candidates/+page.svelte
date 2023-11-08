<script>
  /** @type {import('./$types').PageData} */
  export let data;
  let candidates = data.candidates;
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { afterUpdate } from "svelte";
  import PersonCard from "$lib/components/PersonCard.svelte";
  let dataLoaded = false;
  let userIsAdmin = false;
  afterUpdate(() => {
    dataLoaded = true;
    userIsAdmin = sessionStorage.getItem("role") === "admin";
  });
  const template = {
    name: "New Candidate (edit this to add new candidate)",
    message: `Lorem Ipsum on yksinkertaisesti testausteksti, jota tulostus- ja ladontateollisuudet käyttävät. 
    Lorem Ipsum on ollut teollisuuden normaali testausteksti jo 1500-luvulta asti, jolloin tuntematon tulostaja otti kaljuunan 
    ja sekoitti sen tehdäkseen esimerkkikirjan. Se ei ole selvinnyt vain viittä vuosisataa, mutta myös loikan elektroniseen kirjoitukseen, 
    jääden suurinpiirtein muuntamattomana. Se tuli kuuluisuuteen 1960-luvulla kun Letraset-paperiarkit, joissa oli Lorem Ipsum pätkiä, 
    julkaistiin ja vielä myöhemmin tietokoneen julkistusohjelmissa, kuten Aldus PageMaker joissa oli versioita Lorem Ipsumista.`,
    img: "https://avatar.iran.liara.run/public",
  }

  const newCandidateHandler = (e) => {
    candidates = [...candidates, e.detail.newCandidate];
  }

  const candidateDeleteHandler = (e) => {
    candidates = candidates.filter(c => c.id !== e.detail.deletedCandidateId);
  }

</script>

{#if !dataLoaded}
  <!--Server response time can be quite inconsistent. This should be considered for all pages-->
  <ProgressRadial class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
{/if}

{#if candidates}
  <div class="grid grid-cols-1 md:grid-cols-2 landscape:xl:grid-cols-3 md:gap-2 lg:gap-4 overflow-scroll py-4 lg:py-12">
    {#each candidates as candidate}
      <PersonCard person={candidate} editable={true} on:deletecandidate={candidateDeleteHandler}/>
    {/each}
    {#if userIsAdmin}
      <PersonCard on:newcandidate={newCandidateHandler} editable={true} person={template}/>
    {/if}
  </div>
{/if}
