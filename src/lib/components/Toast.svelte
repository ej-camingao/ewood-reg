<!-- src/lib/components/Toast.svelte -->
<script>
    import { notifications } from '../stores/notificationStore';
    import { fly } from 'svelte/transition';
    import { X } from 'lucide-react';
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
    {#each $notifications as notification (notification.id)}
        <div
            transition:fly={{ x: 100, duration: 300 }}
            class="flex items-center p-4 rounded-lg shadow-lg min-w-[300px] max-w-md"
            class:bg-green-100={notification.type === 'success'}
            class:bg-red-100={notification.type === 'error'}
        >
            <div class="flex-1">
                <p 
                    class:text-green-800={notification.type === 'success'}
                    class:text-red-800={notification.type === 'error'}
                    class="text-sm font-medium"
                >
                    {notification.message}
                </p>
            </div>
            <button
                on:click={() => notifications.remove(notification.id)}
                class="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
                <X size={18} />
            </button>
        </div>
    {/each}
</div>