<script>
  import { auth, googleProvider, db } from './firebase'
  import { authState } from 'rxfire/auth'

  // store the user's info once they're logged in
  let user = authState(auth)

  // https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk
  function login() {
    auth.signInWithPopup(googleProvider)
  }

  function logout() {
    auth.signOut()
  }

  /* How to allow reading and writing:
   * 1. Go to your Firebase Project Console (https://console.firebase.google.com/)
   * 2. In the Develop menu (left) go to Database and the Rules tab
   * 3. Update the 'allow' line (approx. line 5):
   * 4.   allow read, write: if request.auth != null;
   * 5. Click Publish and wait a minute before testing
  */

  // https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
  function addData() {
    db.collection('players').doc($user.uid).set(
      {
        firstName: firstName,
        lastName: lastName,
        score: score,
      }
    )
  }

  // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
  async function readData() {
    let player = await db.collection("players").doc($user.uid).get()

    player = player.data()

    firstName = player.firstName
    lastName = player.lastName
    score = player.score
  }

  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  function updateScore() {
    db.collection('players').doc($user.uid).update(
      {
        score: score
      }
    )
  }

  // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
  function deletePlayer() {
    db.collection('players').doc($user.uid).delete()
  }

  // variables for the page
  let firstName = ''
  let lastName = ''
  let score = ''
</script>

<section class="section content">
  {#if $user}
    <!-- displayName and uid from the user's Google profile, not the database -->
    <h1>Welcome, {$user.displayName}</h1>

    <p>Your user id is <strong>{$user.uid}</strong></p>

    <div class="field is-grouped">
      <p class="control">
        <button class="button is-success" on:click={addData}>Add me</button>
      </p>
      <p class="control">
        <button class="button is-info" on:click={readData}>Read my data</button>
      </p>
      
      <p class="control">
        <button class="button is-link" on:click={updateScore}>Update my score</button>
      </p>
      <p class="control">
        <button class="button is-warning" on:click={logout}>Logout</button>
      </p>
    </div>
    
    <label class="label">
      First name:
      <input class="input" bind:value={firstName}>
    </label>

    <label class="label">
      Last name:
      <input class="input" bind:value={lastName}>
    </label>

    <label class="label">
      Score:
      <input class="input" type="number" bind:value={score}>
    </label>
  {:else}
    <h1>Welcome</h1>
    <p>You're not logged in</p>
    <button class="button is-success" on:click={login}>Login</button>
  {/if}
</section>
