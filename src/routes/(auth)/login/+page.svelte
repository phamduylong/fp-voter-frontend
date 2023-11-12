<script>
  import { goto } from "$app/navigation";
  import { alertState } from "$lib/alertStore.js";
  const usernameRegex = /^(?![\d_])(?!.*[^\w-]).{4,20}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*_])([A-Za-z\d@#$%^&+=!*_]){8,20}$/;
  let username = "";
  let password = "";

  $: usernameFormatInvalid = !usernameRegex.test(username);
  $: passwordFormatInvalid = !passwordRegex.test(password);
  $: credentialsInvalid =
    username === "" ||
    password === "" ||
    usernameFormatInvalid ||
    passwordFormatInvalid;

  function parseJwtPayload(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  function postUserData() {
    const user = { username: username, password: password };
    fetch("https://fingerprint-voter-server.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        const response = await res.json();
        switch (res.status) {
          case 200:
            const tokenPayload = parseJwtPayload(response.token);
            sessionStorage.setItem(
              "userId",
              tokenPayload.userId
            );
            sessionStorage.setItem(
              "username",
              tokenPayload.username
            );
            sessionStorage.setItem(
              "role",
              tokenPayload.isAdmin ? "admin" : "user"
            );
            sessionStorage.setItem("jwt", response.token);
            await goto("/home");
            break;

          // everything but 200 will be an error here
          default:
            if (response.error) {
              alertState.show(response.error, "error");
            } else {
              alertState.show("Failed to login!", "error");
            }
            break;
        }
      })
      .catch((err) => {
        alertState.show(err, "error");
      });
  }
</script>

<main>
  <div
    class="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-3/4 lg:w-1/3"
  >
    <h3 class="h3 m-4 text-center">Login</h3>
    <label class="label m-4">
      <span>Username</span>
      <input
        class="input"
        title="Input username"
        type="text"
        bind:value={username}
      />
    </label>
    <label class="label m-4 mb-10">
      <span>Password</span>
      <input
        class="input"
        title="Input password"
        type="password"
        bind:value={password}
      />
    </label>
    <button
      disabled={credentialsInvalid}
      type="button"
      class="btn variant-filled mr-4 mt-4 mb-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      id="submitForm"
      on:click={postUserData}>Login</button
    >
    <br /><br />
    <a
      href="http://localhost:8081/register"
      class="anchor m-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 text-center"
    >
      Not a user yet? Register now.
    </a>
    <br /><br />
  </div>
</main>
