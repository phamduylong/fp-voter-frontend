<script>
  import { goto } from "$app/navigation";
  import {
    AppShell,
    ListBox,
    ListBoxItem,
    popup,
  } from "@skeletonlabs/skeleton";
  import { alertState } from "$lib/alertStore";
  import "../app.postcss";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";

  $: token =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

  $: currentUser =
    typeof window !== "undefined" ? sessionStorage.getItem("username") : null;

  let comboboxValue = "";

  const popupCombobox = {
    event: "click",
    target: "popupCombobox",
    placement: "bottom",
    closeQuery: "",
  };

  async function handleLogout() {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("userId");
        alertState.show("Logged out successfully!", "success");
        await goto("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  let alertHideTimeout = null;

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
        class="btn variant-filled absolute right-10 !bg-inherit hover:!bg-gray-800 !text-inherit border-2"
        use:popup={popupCombobox}
      >
        Hello, {currentUser}
        <div class="card py-2" data-popup="popupCombobox">
          <ListBox>
            <ListBoxItem
              bind:group={comboboxValue}
              name="medium"
              value="profile"
              ><a href="/profile" class="anchor hover:!bg-transparent"
                >Profile</a
              ></ListBoxItem
            >
            <ListBoxItem
              bind:group={comboboxValue}
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
  {/if}
{/if}

<slot />

<style>
</style>
