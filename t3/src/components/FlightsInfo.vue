<template>
    <div class="information-box">
        <div>
            <span>{{ flight_list['code'] }}</span>
        </div> 
        <div>
            <span>{{ flight_list['airline'] }}</span>
        </div> 
         <div>
            <span>{{ flight_list['plane'] }}</span>
        </div> 
        <div>
            <span>Pasajeros: </span>
            <li v-for="passenger in flight_list['passengers']" :key="passenger">
                <ul>{{ passenger.name }} - {{ passenger.age }}</ul>
            </li>
        </div>
        <div>
            <span>Origen: {{ flight_list['origin'] }}</span>
            <br />
            <span>Destino: {{ flight_list['destination'] }}</span>

        </div>
    </div>
</template>
<script>

export default ({
    props: {
        flight_list: Object
    },
    data() {
        return {
            hello_world: 'Hello World', 
        }
    }
})
</script>
<style>
.information-box {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 32px;
    padding-right: 32px;
}
</style>