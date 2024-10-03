<script>
  import { onMount } from 'svelte';
  import SearchAttendee from './lib/SearchAttendee.svelte';
  import NewAttendeeForm from './lib/NewAttendeeForm.svelte';
  import AttendanceList from './lib/AttendanceList.svelte';
  import Database from './lib/Database.svelte';

  let attendees = [];
  let currentView = 'search';
  let showPasswordPrompt = false;
  let password = '';

  onMount(() => {
    const storedAttendees = localStorage.getItem('attendees');
    if (storedAttendees) {
      attendees = JSON.parse(storedAttendees);
    }
    const today = new Date().toISOString().split('T')[0];
    attendees = attendees.map(a => ({...a, present: a.lastPresent === today}));
    saveAttendees();

    // Set up routing
    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  });

  function handleRouteChange() {
    const path = window.location.pathname;
    if (path === '/Database') {
      currentView = 'database';
    } else if (path === '/new') {
      currentView = 'new';
    } else if (path === '/list') {
      currentView = 'list';
    } else {
      currentView = 'search';
    }
  }

  function navigateTo(view) {
    if (view === 'database') {
      showPasswordPrompt = true;
    } else {
      history.pushState(null, '', view === 'search' ? '/' : `/${view}`);
      currentView = view;
    }
  }

  function checkPassword() {
    if (password === '1234') {
      showPasswordPrompt = false;
      password = '';
      history.pushState(null, '', '/Database');
      currentView = 'database';
    } else {
      alert('Incorrect password');
    }
  }

  function cancelPasswordPrompt() {
    showPasswordPrompt = false;
    password = '';
  }

  function saveAttendees() {
    localStorage.setItem('attendees', JSON.stringify(attendees));
  }

  function markPresent(event) {
    const attendeeToMark = event.detail;
    const today = new Date().toISOString().split('T')[0];
    attendees = attendees.map(a => 
      a.name === attendeeToMark.name 
        ? {...a, present: true, lastPresent: today}
        : a
    );
    saveAttendees();
  }

  function unmarkAttendance(event) {
    const attendeeToUnmark = event.detail;
    const today = new Date().toISOString().split('T')[0];
    attendees = attendees.map(a => 
      a.name === attendeeToUnmark.name 
        ? {...a, present: false, lastPresent: a.lastPresent === today ? null : a.lastPresent}
        : a
    );
    saveAttendees();
  }

  function addNewAttendee(event) {
    const newAttendee = event.detail;
    const today = new Date().toISOString().split('T')[0];
    attendees = [...attendees, { ...newAttendee, present: true, lastPresent: today }];
    saveAttendees();
    navigateTo('search');
  }

  function deleteAttendee(event) {
    const attendeeToDelete = event.detail;
    attendees = attendees.filter(a => a.name !== attendeeToDelete.name);
    saveAttendees();
  }

  function updateAttendee(event) {
  const updatedAttendee = event.detail;
  attendees = attendees.map(a => 
    a.name === updatedAttendee.name ? {...a, ...updatedAttendee} : a
  );
  attendees = [...attendees]; // Trigger reactivity
  saveAttendees();
}
</script>

<main>
  <div class="flex justify-center items-center px-4">
    <img src="logo.png" alt="Elevate Eastwood Logo"/>
  </div>
  
  <h1 class="font-bold text-3xl mb-6">Welcome to Elevate Eastwood!</h1>

  <nav class="mt-10 flex justify-between w-full mb-10">
    <button class="flex-grow mx-1" on:click={() => navigateTo('search')}>Register</button>
    <button class="flex-grow mx-1" on:click={() => navigateTo('new')}>New Here?</button>
    <button class="flex-grow mx-1" on:click={() => navigateTo('list')}>Attendance</button>
    <button class="flex-grow mx-1" on:click={() => navigateTo('database')}>Database</button>
  </nav>

  {#if currentView === 'search'}
    <SearchAttendee {attendees} on:markPresent={markPresent} />
  {:else if currentView === 'new'}
    <NewAttendeeForm on:addAttendee={addNewAttendee} />
  {:else if currentView === 'list'}
    <AttendanceList 
      {attendees} 
      on:unmarkAttendance={unmarkAttendance}
    />
  {:else if currentView === 'database'}
    <Database 
      {attendees} 
      on:deleteAttendee={deleteAttendee}
      on:updateAttendee={updateAttendee}
    />
  {/if}

 
  {#if showPasswordPrompt}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class=" bg-slate-900 p-8 rounded-lg shadow-xl">
        <h2 class="text-xl mb-4">Enter Password</h2>
        <input type="password" bind:value={password} class="border p-2 mb-4 w-full" placeholder="Enter password">
        <div class="flex justify-end">
          <button on:click={cancelPasswordPrompt} class="bg-gray-300 text-black px-4 py-2 rounded mr-2 border p-2 mb-4 w-full">Cancel</button>
          <button on:click={checkPassword} class="bg-blue-500 text-white px-4 py-2 rounded border p-2 mb-4 w-full">Submit</button>
        </div>
      </div>
    </div>
  {/if}
</main>