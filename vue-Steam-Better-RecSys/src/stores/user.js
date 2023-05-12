import {defineStore} from "pinia";

const useUserStore = defineStore("users", {
    state: () => ({
        isAccepted: false
    }),
    actions: {
        acceptCookie(bool) {
            this.isAccepted = bool;
        }
    }
})

export default useUserStore;