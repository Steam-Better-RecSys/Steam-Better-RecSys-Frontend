<template>
    <div
        class="toast position-fixed bottom-0 end-0 m-2 show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        v-if="!isAccepted"
    >
        <div class="toast-header">
            <font-awesome-icon icon="fas fa-cookie-bite" />
            <strong class="ms-2 me-auto">Cookies</strong>
        </div>
        <div class="toast-body rounded-bottom">
            We baked some cookies that you have to accept if you want to make
            the service work correctly. It does not work without them.
            <a href="/cookies">Learn More</a>
            <div class="mt-2">
                <button
                    type="button"
                    class="btn btn-light btn-sm"
                    data-bs-dismiss="toast"
                    @click="handleAccept"
                >
                    Accept
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import useUserStore from '@/stores/user';

export default {
    name: 'CookieMessage',
    methods: {
        ...mapActions(useUserStore, ['acceptCookie']),
        handleAccept() {
            this.acceptCookie(true);
        },
    },
    computed: {
        ...mapState(useUserStore, ['isAccepted']),
    },
};
</script>

<style scoped>
@import '../styles/main.css';
</style>
