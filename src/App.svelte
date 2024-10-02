<script>
  import { onMount } from 'svelte';
  import SearchAttendee from './lib/SearchAttendee.svelte';
  import NewAttendeeForm from './lib/NewAttendeeForm.svelte';
  import AttendanceList from './lib/AttendanceList.svelte';
  import Database from './lib/Database.svelte';

  let attendees = [];
  let currentView = 'search';

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
      history.pushState(null, '', '/Database');
    } else if (view === 'new') {
      history.pushState(null, '', '/new');
    } else if (view === 'list') {
      history.pushState(null, '', '/list');
    } else {
      history.pushState(null, '', '/');
    }
    currentView = view;
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
      a.name === updatedAttendee.name ? updatedAttendee : a
    );
    saveAttendees();
  }
</script>

<main>
  <div class="flex justify-center items-center px-4">
    <img src="logo.png" alt="Elevate Eastwood Logo"/>
  </div>
  
  <h1 class="font-bold">Welcome to Elevate Eastwood!</h1>

  <nav class="mt-10">
    <button on:click={() => navigateTo('search')}>Register</button>
    <button on:click={() => navigateTo('new')}>New Attendee</button>
    <button on:click={() => navigateTo('list')}>Today's Attendance</button>
    {#if currentView === 'database'}
      <button on:click={() => navigateTo('search')}>Exit Database</button>
    {/if}
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
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  button {
    padding: 10px;
    flex-grow: 1;
    margin: 0 5px;
    font-size: medium;
  }
</style>