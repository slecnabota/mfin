<template>
    <select v-model="selectedItem" class="filter-element selected-item">
        <option v-for="item in items" :key="item.id" :value="item.name">{{ item.name }}</option>
    </select>
</template>
<script>

export default {
    data() {
        return {
            selectedItem: null,
            items: [
                { id: 1, name: 'За текущую неделю' },
                { id: 2, name: 'За прошлую неделю' },
                { id: 3, name: 'За текущий месяц' },
                { id: 4, name: 'За прошлый месяц' },
                { id: 5, name: 'За все время' },
                { id: 6, name: 'Выбрать даты' },
            ],
        };
    },
    created() {
        this.selectedItem = this.items[4].name;
    },
};
</script>


<style scoped lang="scss">
    .selected-item {
        width: fit-content;
        border-radius: 20px;
        padding: 10px 15px;
        border-radius: 20px;
        border: none;
        outline: none;
        display: block;
        position: relative;

        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #38635D;

        option {
            padding: 15px;
            background: #FFFFFF;
            box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.15);
            border-radius: 8px;

            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            color: #38635D;
        }

        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 14px;
            height: 8px;
            background: url('./../assets/arrow-down.svg');
            background-repeat: no-repeat;
            background-size: contain;
        }
        &.filter-element{
            background: #E1EDEA;
            cursor: pointer;
        }
    }
</style>
