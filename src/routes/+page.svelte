<script>
    import { goto } from "$app/navigation";
    import { browser } from '$app/environment';
    import { AppShell } from "@skeletonlabs/skeleton";
    $: loggedIn = (browser) ? sessionStorage.getItem("jwt") !== null : false;
    const navigateToLoginPage = async () => {
        await goto("/login");
    }
</script>
<svelte:head>
  <title>FP Voter</title>
</svelte:head>
<div class="relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 lg:p-10 mx-4 md:mx-6 lg:mx-10 my-20">
  <h2 class="h2">
    Vote for a better future
  </h2><br>
  <p>Every vote matters!</p><br><br>
  {#if !loggedIn}
    <button class="btn variant-filled-secondary" on:click={navigateToLoginPage}>Login</button>
  {/if}
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!--This is an exception from the layouts-->
<AppShell>
  <slot />
  <svelte:fragment slot="pageFooter">
      <nav class="w-full p-5 lg:p-15 card !rounded-none grid grid-cols-2 lg:grid-cols-4">
        <div class="p-1 md:p-5 lg:p-10">
          <h4 class="h4">Contact information</h4>
          <br>
          <span><i class="fa fa-map-pin"></i>&nbsp;&nbsp;<a href="https://maps.app.goo.gl/idEzGhBPDR5H2WSe8" class="hover:anchor">Ritarikatu 2 B, Helsinki</a></span><br>
          <span><i class="fa fa-phone"></i>&nbsp;&nbsp;<a href="tel:+358 295 16001" class="hover:anchor">+358 295 16001</a></span><br>
          <span><i class="fa fa-envelope"></i>&nbsp;&nbsp;<a href="mailto:registry.vnk@gov.fi" class="hover:anchor">registry.vnk@gov.fi</a></span>
        </div>
        <div class="p-1 md:p-5 lg:p-10">
          <h4 class="h4">Quick Link</h4>
          <br>
          <span><i class="fa fa-caret-square-o-right"></i>&nbsp;<a href="/faq" class="hover:anchor">FAQ</a><br></span>
          <span><i class="fa fa-caret-square-o-right"></i>&nbsp;<a href="/about" class="hover:anchor">About Us</a><br></span>
          <span><i class="fa fa-caret-square-o-right"></i>&nbsp;<a href="/privacy-policy" class="hover:anchor">Privacy Policy</a><br></span>
          <span><i class="fa fa-caret-square-o-right"></i>&nbsp;<a href="/terms-conditions" class="hover:anchor">Terms and Conditions</a></span>
        </div>
      </nav>
    </svelte:fragment>
</AppShell>
