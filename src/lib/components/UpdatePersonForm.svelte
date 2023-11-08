<script>
    import { getModalStore, FileDropzone, Avatar } from '@skeletonlabs/skeleton';
    import { alertState } from '$lib/alertStore.js';
    const modalStore = getModalStore();
    let name = $modalStore[0].meta.candidate.name ?? "";
    let message = $modalStore[0].meta.candidate.message ?? "";
    let file = null;
    let tmpImageURL = $modalStore[0].meta.candidate.img ?? "";

    const onFileChosen = () => {
        if(file && !file[0].type.includes("image")) {
            alertState.show("File must be an image", "error");
            file = null;
        } else {
            tmpImageURL = URL.createObjectURL(file[0]);
        }
    }

    const attemptUpdate = () => {
        if(!name || !message) {
            alertState.show("Name and message are required", "error");
            modalStore.close();
            return;
        }
        let payload = new FormData();
        payload.append("name", name);
        payload.append("message", message);
        if(file) payload.append("file", file[0]);

        fetch(`https://fingerprint-voter-server.onrender.com/candidate/update/id=${$modalStore[0].meta.candidate.id ?? null}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
            },
            body: payload
        }).then(res => {
            URL.revokeObjectURL(tmpImageURL);
            if(res.ok) {
                alertState.show("Candidate updated successfully", "success");
                
                $modalStore[0].response(res);
                
                modalStore.close();
            } else {
                if (res.status === 401 && res.status == 403) {
                    alertState.show("You are not authorized to perform this action", "error");
                } else {
                    res.json().then(data => {
                        alertState.show(data.error, "error");
                    });
                }
            }
        }).catch(err => {
            alertState.show(err, "error");
        });
    }

    const attemptCreate = () => {
        if(!name || !message || !file) {
            alertState.show("Name, profile picture and message are required to create a new candidate.", "error");
            modalStore.close();
            return;
        }

        let payload = new FormData();
        payload.append("name", name);
        payload.append("message", message);
        payload.append("file", file[0]);

        fetch(`https://fingerprint-voter-server.onrender.com/candidate/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
            },
            body: payload
        }).then(res => {
            URL.revokeObjectURL(tmpImageURL);
            if(res.ok) {
                alertState.show("Candidate was created successfully.", "success");
                
                $modalStore[0].response(res);
                
                modalStore.close();
            } else {
                if (res.status === 401 && res.status == 403) {
                    alertState.show("You are not authorized to perform this action", "error");
                } else {
                    res.json().then(data => {
                        alertState.show(data.error, "error");
                    });
                }
            }
        }).catch(err => {
            alertState.show(err, "error");
        });

    }
    
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4 !overflow-scroll">
		<header class="text-2xl font-bold flex justify-center">{$modalStore[0].title ?? 'Update candidate'}</header>
		<!-- Enable for debugging: -->
		<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" bind:value={name} placeholder="Candidate's name" />
			</label>
			<label class="label">
				<span>Message</span>
				<textarea class="input" type="email" bind:value={message} placeholder="Candidate's messages" />
			</label>
            <label class="label">
                <span>Image</span>
                <FileDropzone name="files" on:change={onFileChosen} bind:files={file}>
                    <svelte:fragment slot="lead"><i class="fa fa-upload"></i></svelte:fragment>
                    <svelte:fragment slot="message">Upload a new image for candidate (optional)</svelte:fragment><br>
                    
                    <div slot="meta" class="flex justify-center mt-6">
                        <Avatar
                        src={tmpImageURL}
                        width="w-32"
                        rounded="rounded-full"
                      />
                    </div>
                </FileDropzone>

                <!--Dirty trick to escape compiler complaining about label not having input-->
                <input class="!hidden">
            </label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer flex justify-end p-2">
        <button class="btn variant-ghost m-2" on:click={modalStore.close}>Cancel</button>
        <button class="btn variant-filled m-2" on:click={() => {
                if(!$modalStore[0].meta.dummyCandidate) attemptUpdate();
                else attemptCreate();
            }}>Save</button>
    </footer>
	</div>
{/if}