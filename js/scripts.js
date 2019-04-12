Vue.component('weather__list', {
    props: ['text','morn','day','eve','night','img','show_param_name','show','show2','show3'],
    template: ' \<transition  name="slide" >\
        \<div class="weather__now">\
            \<div class="weather__now-text">{{ text }}</div>\
            \<div class="weather__now-block">\
                    \<img :src="img" class="weather__now-image">\
            \</div>\
            \<div class="weather__now-temp"><span class="weather__now-temp-grad">{{ day }}</span><span class="weather__now-temp-C">&ordm;</span></div>\
            <div class="weather__now-city">Казань</div>\
        \</div>\
    </transition>\
  ',
})

var app = new Vue({
	el:"#app",
    data: {
            show_today:true,
            show_tom:false,
            show_dat:false,
            weather_data:'',
            weather_list:[],
    },
    created:function(){
        this.getWeather();
    },
    methods: {
        getWeather: function(event) {
            axios.get('https://gist.githubusercontent.com/anonymous/feb1b31516f3e36a14b29657701f18d2/raw/eaa544aed7e3bdee37c6caa2a515f1d4c38fbd4f/weather.json').then(response => {
                //this.response = console.log(response);
                weather_data=response.data;
                console.log(weather_data);
                console.log((weather_data.list[0].temp.day-273).toFixed());
                weather_list=[
                          {
                            id: 1,
                            text: weather_data.list[0].weather[0].description,
                            morn: weather_data.list[0].temp.morn,  
                            day: weather_data.list[0].temp.day,
                            eve: weather_data.list[0].temp.eve,
                            night: weather_data.list[0].temp.night,
                            show_param_name: "show_today",
                            show: true,
                            show2: false,
                            show3: false
                          },
                          {
                            id: 2,
                            text: weather_data.list[1].weather[0].description,
                            morn: weather_data.list[1].temp.morn,  
                            day: weather_data.list[1].temp.day,
                            eve: weather_data.list[1].temp.eve,
                            night: weather_data.list[1].temp.night,
                            show_param_name: "show_tom",
                            show: false,
                            show2: true,
                            show3: false
                          },
                          {
                            id: 3,
                            text: weather_data.list[2].weather[0].description,
                            morn: weather_data.list[2].temp.morn,  
                            day: weather_data.list[2].temp.day,
                            eve: weather_data.list[2].temp.eve,
                            night: weather_data.list[2].temp.night,
                            show_param_name: "show_dat",
                            show:false,
                            show2: false,
                            show3: true
                          }
                    ]
                    this.weather_list = weather_list;
            }).catch(
                error => {
                    console.log(error);
                    alert("Ошибка");
                }
            );   
        },
        drawWeather: function(event){
            var now = new Date();
        }
    },
});