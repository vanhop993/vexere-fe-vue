<template>
    <div>
        Profile page
    </div>
</template>
<script>
import { A_FETCH_PROFILE } from '../../../store/profile/constant'
export default {
    beforeCreate() {
        this.$store.dispatch(A_FETCH_PROFILE);
    },
}
</script>
<style>
    
</style>