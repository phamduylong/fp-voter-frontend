<script>
  import { goto } from "$app/navigation";
  import { alertState } from "$lib/alertStore.js";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  const meters = [
    "h-4 animate-pulse bg-orange-600 h-2.5 rounded-full dark:bg-green-500",
    "h-4 animate-pulse bg-orange-600 h-2.5 rounded-full dark:bg-green-500",
    "h-4 animate-pulse bg-orange-600 h-2.5 rounded-full dark:bg-green-500",
    "h-4 animate-pulse bg-orange-600 h-2.5 rounded-full dark:bg-green-500",
    "h-4 animate-pulse bg-orange-600 h-2.5 rounded-full dark:bg-green-500"
  ];

  $: passwordLengthSuffices = password.search(/^([A-Za-z\d@#$%^&+=!*_]){8,20}$/) > -1;
  $: passwordContainsCapitalLetter = password.search(/[A-Z]/) > -1;
  $: passwordContainsDigit = password.search(/[0-9]/) > -1;
  $: passwordContainsSpecialCharacter = password.search(/[@#$%^&+=!*_]/) > -1;
  $: value = [passwordLengthSuffices, passwordContainsCapitalLetter, passwordContainsDigit, passwordContainsSpecialCharacter].filter(r => r === true).length;
  $: max = 4;
  $: meter = meters[value];

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
<svelte:head>
  <title>Login | FP Voter</title>
</svelte:head>
<form class="card relative top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 my-10 w-3/4 lg:w-1/3 max-h-1/4"
  on:submit={postUserData}
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
    type="submit"
    class="btn variant-filled mr-4 mt-4 mb-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
    id="submitForm"
    title={credentialsInvalid ? 'Credentials are not meeting requirements.' : null}>Login</button
  >
  <br /><br />
  <ProgressBar
          class="my-4"
          {meter}
          label="Progress Bar"
          {value}
          {max}
  />

  Password must have:
  <ul class="list m-4">
    <li>
      {passwordLengthSuffices ? "✅" : "❌"} Between 8 and 20 characters long
    </li>
    <li>
      {passwordContainsCapitalLetter ? "✅" : "❌"} A capital letter
    </li>
    <li>
      {passwordContainsDigit ? "✅" : "❌"} A number
    </li>
    <li>
      {passwordContainsSpecialCharacter ? "✅" : "❌"} A special character
    </li>
  </ul>

</form>
<br /><br />
