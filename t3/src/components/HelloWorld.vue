<template>
  <div>
    <h1>Websocket Airlines Information</h1>
    <div class="ambos">
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
          <l-circle-marker
              v-for="(airport, index) in airports"
              :key="`ai-${index}`"
              :lat-lng="airport"
              color="#e80911"
            ></l-circle-marker>  
          <l-circle-marker
            v-for="(plane, index) in planes"
            :key="`pls-${index}`"
            :lat-lng="plane.position"
            :radius=9
          >
            <l-tooltip :options="{ permanent: false, interactive: true }">
              {{ plane.code }}
            </l-tooltip>
          </l-circle-marker>
          <LPolyline 
            v-for="(poly, index) in theoricalPath"
            :key="`p-${index}`"
            :lat-lngs="poly.latlngs"
            :color="poly.color"
          />
            <LPolyline 
            v-for="(line, index) in actualPath"
            :key="`l-${index}`" 
            :lat-lngs="line.latlngs"
            :color="line.color"
            />
        </l-map>
      </div>
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
        LCircleMarker,
        // LControlLayers,
        LTooltip,
        LPolyline,
    } from "vue2-leaflet"

export default {
  components: {
    FlightsInfo,
    LMap,
    LTooltip,
    LPolyline,
    LCircleMarker,
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
          initial_position: [0,0],
          destination: [...f.destination],
        };
      },
    );
  });
  },
  mounted() {
    this.socket.on('POSITION', data => {
      this.planes = this.planes.map((p) => {
        if (data.code === p.code) {
          p.position = data.position;
          if (p.initial_position[0] == 0) {
            p.initial_position = p.position;
          }
        }
        return p;
      });
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
    margin-top: 50px;
    height: 400px;
    width: 400px;
    overflow-y: scroll;
  }

.chatbox-input {
  margin-left:16px;
  width: 320px;
}

.chatbox-bottom {
  width: 400px;
  justify-content: space-between;
}
.mapbox-container {
  height: 450px;
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
.ambos {
  display: flex;
  flex-direction: row;
}
</style>