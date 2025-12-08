<template>
    <div class="container">
        <div>--------------------------</div>
        <div class="text">This is section {{ sectionID }} of Page {{ pageID }} </div>
    </div>
</template>

<script>
export default {
    name: 'SectionComponent',
    computed: {
        sectionID() {
            const sectionID = this.$route.params.sectionId;
            return Number(sectionID);
        },
    },
    props: {
        pageID: {
            type: [String, Number],
            required: true,
        }
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.text {
    font-size: 18px;
}

</style>