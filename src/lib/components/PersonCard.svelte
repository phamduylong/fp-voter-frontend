<script>
  export let person;
  export let editable = false;
  import { Avatar, getModalStore } from "@skeletonlabs/skeleton";
  import { alertState } from "$lib/alertStore.js";
  import { afterUpdate, createEventDispatcher } from "svelte";
  const modalStore = getModalStore();
  const getNameInitials = (name) => {
    const names = name.split(" ");
    let initials = "";
    names.forEach((n) => {
      initials += n[0];
    });
    return initials;
  };
  let userIsAdmin = false;
  const dispatch = createEventDispatcher();
  afterUpdate(() => {
    userIsAdmin = sessionStorage.getItem("role") === "admin";
  });

  const modalCallback = (res) => {
    res.json().then((data) => {
      if(data.error) {
        alertState.show(data.error, "error");
        return;
      }
      if(data.warning) {
        alertState.show(data.warning, "warning");
      }

      if (data.updatedCandidate && data.updatedCandidate != {}) person = data.updatedCandidate;
      if (data.createdCandidate && data.createdCandidate != {}) {
        dispatch("newcandidate", {newCandidate: data.createdCandidate });
      };
    });
  };

  const modalDeleteCallback = (ok) => {
    if (!ok) return;
    fetch(`https://fingerprint-voter-server.onrender.com/candidate/delete/id=${person.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      }
    }).then(res => {
      if(res.ok) {
        alertState.show("Candidate deleted successfully", "success");
        dispatch("deletecandidate", { deletedCandidateId: person.id });
      } else {
        if (res.status === 401 || res.status === 403) {
          alertState.show("You are not authorized to perform this action", "error");
        } else {
          res.json().then(data => {
            if(data.error) alertState.show(data.error, "error");
          });
        }
      }
    }).catch(err => {
      alertState.show(err, "error");
    });
  }

</script>

<div class="card mx-10 my-10 card-hover">
  {#if editable && userIsAdmin}
    <div class="flex justify-end p-2">
      <button
        class="btn variant-outline"
        on:click={() => {
          const modal = {
            type: "component",
            title: "Update candidate",
            component: "updatePersonForm",
            meta: {
              candidate: person,
              //dummyCandidate is used to determine whether to create or update candidate
              dummyCandidate: !person.id,
            },
            response: modalCallback
          };
          modalStore.trigger(modal);
        }}><i class="fa fa-edit" /></button
      >
      {#if person.id !== null && person.id !== undefined}
        <button
          class="btn variant-outline"
          on:click={() => {
            const modal = {
              type: "confirm",
              title: "Delete candidate",
              body: `Are you sure you want to delete candidate <b>${person.name ? person.name : ""}</b>? This action is <b class="text-red-700">irreversible</b>!`,
              response: modalDeleteCallback
            };
            modalStore.trigger(modal);
          }}><i class="fa fa-trash" /></button
        >
      {/if}
    </div>
  {/if}
  <header class="card-header flex justify-center">
    <Avatar
      src={person.img}
      width="w-32"
      rounded="rounded-full"
      initials={getNameInitials(person.name)}
    />
  </header>
  <section class="p-4 text-center text-xl">{person.name}</section>
  <footer class="card-footer text-justify">{person.message}</footer>
</div>
