<script>
    import { createEventDispatcher } from 'svelte';
  
    let newAttendee = { name: '', nickname: '', age: '', birthday: '', contact: '', socials: '', gender: '' };
    const dispatch = createEventDispatcher();
  
    function addNewAttendee() {
      dispatch('addAttendee', newAttendee);
      newAttendee = { name: '', nickname: '', age: '', birthday: '', contact: '', socials: '', gender: '' };
    }
</script>
  
<form on:submit|preventDefault={addNewAttendee}>
    <input class="rounded-md" bind:value={newAttendee.name} placeholder="Name" required />
    <input class="rounded-md" bind:value={newAttendee.nickname} placeholder="Nickname" required />
    <div class="gender-selection">
        <label>
            <input type="radio" bind:group={newAttendee.gender} value="male" required>
            Male
        </label>
        <label>
            <input type="radio" bind:group={newAttendee.gender} value="female" required>
            Female
        </label>
    </div>
    <input class="rounded-md" bind:value={newAttendee.age} type="number" placeholder="Age" required />
    <input class="rounded-md" bind:value={newAttendee.birthday} type="date" placeholder="Birthday" required />
    <input class="rounded-md" bind:value={newAttendee.contact} placeholder="Contact Number" required />
    <input class="rounded-md" bind:value={newAttendee.socials} placeholder="Social Media" />
    

    
    <button type="submit">Register</button>
</form>
  
<style>
    form {
        display: flex;
        flex-direction: column;
    }
    input, button {
        margin: 10px 0;
        padding: 5px;
        width: 100%;
    }
    .gender-selection {
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
    }
    .gender-selection label {
        display: flex;
        align-items: center;
    }
    .gender-selection input[type="radio"] {
        margin: 0 5px 0 0;
        width: auto;
    }
</style>