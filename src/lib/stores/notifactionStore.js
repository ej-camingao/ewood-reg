// src/lib/stores/notificationStore.js
import { writable } from 'svelte/store';

function createNotificationStore() {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        add: (message, type = 'success', duration = 3000) => {
            const id = Math.random().toString(36).substring(2);
            update(notifications => [
                ...notifications,
                { id, message, type, duration }
            ]);

            // Auto-remove notification after duration
            setTimeout(() => {
                update(notifications => notifications.filter(n => n.id !== id));
            }, duration);
        },
        remove: (id) => {
            update(notifications => notifications.filter(n => n.id !== id));
        },
        clear: () => set([])
    };
}

export const notifications = createNotificationStore();