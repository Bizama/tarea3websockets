<template>
  <div>
    <h1>Websocket Airlines Information</h1>
    <div> 
      <ul ref="chatbox" class="chatbox-container" id="chatbox">
        <li v-for="message in messages" :key="message.name" class="list">
          {{ message.name }}({{message.date}}): {{ message.message }}
        </li>
      </ul>
      <form @submit.prevent="sendMessage" class="chatbox-bottom" v-if="this.nickname != ''">
        <input  class="chatbox-input" type="text" placeholder="Message..." v-model="message" />
        <input type="submit" value="Send" />
      </form>
      <form @submit.prevent="changeNickname" v-else>
        <span>Introduzca un nickname para chatear</span>
        <br>
        <input type="text"  class="chatbox-input" placeholder="Escriba su nickname..." v-model="nickname_aux" />
        <input type="submit" value="Ingresar" /> 
      </form>
    </div>
    <div class='mapbox-container'>
       <l-map 
        :min-zoom="4"
        v-model="zoom"
        :v-model="zoom"
        :center="[-33.8, -70.803203]"
        ref="myMap">
         <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         <l-circle
            v-for="(airport, index) in airports"
            :key="`ai-${index}`"
            :lat-lng="airport"
            :radious=10
          ></l-circle>  
       </l-map>
    </div>
    <div style="margin-top:32px">
      <button @click="getFlights">Obtener informacion de vuelos</button>
      <div class="flights-info"> 
        <li v-for="flight in flights[0]" :key="flight.code">
          <flights-info v-bind:flight_list="flight" />
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import FlightsInfo from "./FlightsInfo";
import "leaflet/dist/leaflet.css";
import { 
        LMap,
        LTileLayer,
        LCircle,
        // LControlLayers,
        // LTooltip,
        // LPolyline,
    } from "vue2-leaflet"

export default {
  components: {
    FlightsInfo,
    LMap,
    // LTooltip,
    // LPolyline,
    LCircle,
    LTileLayer,
    // LControlLayers
  },
  name: 'HelloWorld',
  data() {
    return {
      socket: {},
      message: '',
      messages: [],
      nickname: '',
      flights: [],
      planes: [],
      nickname_aux: '',
      zoom: 6,
    }
  },
  created() {
    this.socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {path: '/flights'});
    this.socket.emit('FLIGHTS');
    this.socket.once('FLIGHTS', data => {
      this.flights.push(data);
      this.planes = this.flights[0].map((f) => {
        return {
          code: f.code,
          position: [...f.origin],
          initial_position: [...f.origin],
          destination: [...f.destination],
        };
      },
    );
  });
  },
  mounted() {
    this.socket.on('POSITION', data => {
      console.log(data);
    });
    this.socket.on('CHAT', data => {
      const message_date = new Date(data.date);
      data.date = message_date;
      this.messages.push(data);
      this.$nextTick(function() {
        var messageBox = this.$refs['chatbox'];
        messageBox.scrollTop = messageBox.scrollHeight;
        }); 
    });
  },
  methods: {
    sendMessage: function () {
      this.socket.emit('CHAT', {name: this.nickname, message: this.message} );
      this.message = ''
      },
    checkNickname: function() { 
      if (this.nickname == '') {
        return false;
      }
    },
    changeNickname: function() {
      this.nickname = this.nickname_aux 
    },
    getFlights: function() { 
            this.socket.emit('FLIGHTS');
          },
  },
  computed: {
    airports: function() {
    return new Set(
      this.flights[0].map((f) => {
        const coords = [...f.origin];
        const coords2 = [...f.destination];
        return [coords, coords2];
      }).flat()
    );
    },
    theoricalPath: function() {
      return this.flights[0].map((f)=> {
        return {
          latlngs: [[...f.origin], [...f.destination]],
          color: '#14B8A6'
        };
      });
    },
    actualPath: function() {
      return this.planes.map((p) => {
        return {
          latlngs: [[...p.initial_position], [...p.position]],
          color: '#b314b8'
        };
      });
    },
  },  
  
  }
</script>

<style>
.chatbox-container{
    height: 50px;
    width: 400px;
    overflow-y: scroll;
  }

.chatbox-input {
  margin-left:16px;
}

.chatbox-bottom {
  width: 400px;
  justify-content: space-between;
}
.mapbox-container {
  height: 400px;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
}
.flights-info {
  height: 200px;
  width: 100%;
  padding-right: 50px;
  padding-left: 50px;
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  list-style: none;
  margin-top: 32px;
}
</style>