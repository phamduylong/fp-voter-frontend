<script>
  import { goto } from "$app/navigation";
  import { afterUpdate } from "svelte";
  import { AppShell, ListBox, ListBoxItem, popup } from "@skeletonlabs/skeleton";
  import { alertState } from "$lib/alertStore";
  import "../app.postcss";
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";

  let alertHideTimeout = null;

  let token = "";

  let currentUser = "";

  afterUpdate(() => {
    // session and local storages should not be used here as they are defined usually when the DOM is rendered
    currentUser = sessionStorage.getItem("username") ?? "anonymous";
    token = sessionStorage.getItem("jwt") ?? "";
  });

  const popupCombobox = {
    event: "click",
    target: "popupCombobox",
    placement: "bottom",
    closeQuery: "",
  };

  async function handleLogout() {
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
        
        await goto("/login");
      })
      .catch((err) => {
        alertState.show(err, "error");
      });
  }
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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


<AppShell>
  <svelte:fragment slot="pageHeader">
    <nav class="list-nav flex justify-center w-full py-4 card !rounded-none h-full">
      <a href="/home">Home</a>
      <a href="/candidates">Candidates</a>
      <a href="/results">Results</a>
      <a href="/about">About</a>
    </nav>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="pageFooter">
    <div class="card !rounded-none p-5">
      Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
      Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 
      consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. 
      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
      This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
       comes from a line in section 1.10.32.
       Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
      Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 
      consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. 
      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
      This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
       comes from a line in section 1.10.32.
       Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
      Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 
      consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. 
      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
      This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
       comes from a line in section 1.10.32.
    </div>
  </svelte:fragment>
</AppShell>

<!--------------------------------------------------------------GLOBAL ALERTS ------------------------------------------------------------>
{#if $alertState.visible}
  {#if $alertState.type === "error"}
    <aside
      class="alert variant-ghost-error w-3/4 absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
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
      class="alert variant-ghost-warning w-3/4 absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
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
      class="alert variant-ghost-success w-3/4 absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
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


