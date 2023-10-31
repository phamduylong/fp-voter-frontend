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
  <div slot="header">
    <nav class="list-nav flex justify-center w-full py-4 card">
      <a href="/home">Home</a>
      <a href="/vote">Vote</a>
      <a href="/results">Results</a>
      <a href="/candidates">Candidates</a>
      <button
        class="btn variant-filled absolute right-10 !bg-inherit !text-inherit border-2 !invisible lg:!visible"
        use:popup={popupCombobox}
      >
        Hello, {currentUser}
        <div class="card py-2" data-popup="popupCombobox">
          <ListBox>
            <ListBoxItem
              name="medium"
              value="profile"
              ><a href="/profile" class="anchor hover:!bg-transparent"
                >Profile</a
              ></ListBoxItem
            >
            <ListBoxItem
              name="medium"
              value="logout"
              on:click={handleLogout}
            >
              <a
                class="anchor hover:!bg-transparent"
                href="/"
                on:click|preventDefault={handleLogout}>Logout</a
              >
            </ListBoxItem>
          </ListBox>
        </div>
      </button>
    </nav>
  </div>
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

<slot />
