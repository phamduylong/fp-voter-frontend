<script>
  import { goto } from "$app/navigation";
  import { afterUpdate } from "svelte";
  import { AppShell } from "@skeletonlabs/skeleton";
  import { alertState } from "$lib/alertStore";
  import "../app.postcss";
  import { page } from '$app/stores';  

  let alertHideTimeout = null;
  let currentUser = "";
  let token = "";
  afterUpdate(() => {
    // session and local storages should not be used here as they are defined usually when the DOM is rendered
    currentUser = sessionStorage.getItem("username") ?? "";
    token = sessionStorage.getItem("jwt") ?? "";
    window.onbeforeunload = async () => {
      await handleLogout(true);
      return "We will log you out if you want to proceed with this action. Do you wish to continue?";
    }
  });

  async function handleLogout(tabCloseAttempt = false) {
    await fetch("https://fingerprint-voter-server.onrender.com/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        if (res.ok) 
          alertState.show("Logged out successfully!", "success");
        if(!tabCloseAttempt) await goto("/");
      })
      .catch((err) => {
        alertState.show(err, "error");
      });
  }
  alertState.subscribe((currState) => {
    if (currState.visible) {
      alertHideTimeout = setTimeout(() => {
        alertState.hide();
      }, 2500);
    } else {
      clearTimeout(alertHideTimeout);
    }
  });
</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<AppShell>
  <svelte:fragment slot="pageHeader">
    <div class="grid grid-cols-3 gap-2 lg:gap-4 w-full py-4 card !rounded-none h-full">


        <h2 class="flex justify-start h2 px-4 lg:px-10 font-jost font-bold relative top-1/2 -translate-y-1/2">PiNKK</h2>
        <nav class="list-nav lg:flex justify-center">
          <a href="/home">Home</a>
          <a href="/candidates">Candidates</a>
          <a href="/results">Results</a>
        </nav>
        {#if $page.url.pathname !== "/login"}
          {#if currentUser === ""}
            <div class="flex justify-end px-4 lg:px-10">
              <button class="btn variant-filled !h-10 lg:h-auto" on:click={async () => { await goto("/login"); }}>
                Login
              </button>
            </div>
          {:else}
            <div class="flex justify-end px-4 lg:px-10">
              <button class="btn variant-filled" on:click={handleLogout}>
                Logout
              </button>
            </div>
          {/if}
        {/if}
    </div>
  </svelte:fragment>
  <slot />
</AppShell>

<!--------------------------------------------------------------GLOBAL ALERTS ------------------------------------------------------------>
{#if $alertState.visible}
  {#if $alertState.type === "error"}
    <aside
      class="alert variant-filled-error w-3/4 absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
    >
      <div class="alert-message">
        {$alertState.message}
      </div>
      <div class="alert-actions">
        <button class="btn variant-filled font-bold" on:click={alertState.hide}
          >X</button
        >
      </div>
    </aside>
  {:else if $alertState.type === "warning"}
    <aside
      class="alert variant-filled-warning w-3/4 absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
    >
      <div class="alert-message">
        {$alertState.message}
      </div>
      <div class="alert-actions">
        <button class="btn variant-filled font-bold" on:click={alertState.hide}
          >X</button
        >
      </div>
    </aside>
  {:else if $alertState.type === "success"}
    <aside
      class="alert variant-filled-success w-3/4 absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
    >
      <div class="alert-message">
        {$alertState.message}
      </div>
      <div class="alert-actions">
        <button class="btn variant-filled font-bold" on:click={alertState.hide}
          >X</button
        >
      </div>
    </aside>
  {/if}
{/if}
<!---------------------------------------------------------------------------------------------------------------------------------------->
