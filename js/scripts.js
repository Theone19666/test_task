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
                weather_list=[
                          {
                            id: 1,
                            text: weather_data.list[0].weather[0].description,
                     /*       morn: (weather_data.list[0].temp.morn-273).toFixed(),  
                            day: (weather_data.list[0].temp.day-273).toFixed(),
                            eve: (weather_data.list[0].temp.eve-273).toFixed(),
                            night: (weather_data.list[0].temp.night-273).toFixed(),*/
                            temperature: this.getTemperature(),
                            show_param_name: "show_today",
                            show: true,
                            show2: false,
                            show3: false,
                            city: weather_data.city.name,
                            day: this.getToday().getDate(), 
                            month: app.getToday().toLocaleString('ru', { month: 'long' }), 
                            year: this.getToday().getFullYear(),
                            image: this.getImage(weather_data.list[0].weather[0].description)
                          },
                          {
                            id: 2,
                            text: weather_data.list[1].weather[0].description,
                            morn: (weather_data.list[1].temp.morn-273).toFixed(),  
                            day: (weather_data.list[1].temp.day-273).toFixed(),
                            eve: (weather_data.list[1].temp.eve-273).toFixed(),
                            night: (weather_data.list[1].temp.night-273).toFixed(),
                            show_param_name: "show_tom",
                            show: false,
                            show2: true,
                            show3: false,
                            city: weather_data.city.name,
                            day: this.getTomorrow().getDate(), 
                            month: app.getTomorrow().toLocaleString('ru', { month: 'long' }),
                            year: this.getTomorrow().getFullYear(),
                            image: this.getImage(weather_data.list[1].weather[0].description)
                          },
                          {
                            id: 3,
                            text: weather_data.list[2].weather[0].description,
                            morn: (weather_data.list[2].temp.morn-273).toFixed(),  
                            day: (weather_data.list[2].temp.day-273).toFixed(),
                            eve: (weather_data.list[2].temp.eve-273).toFixed(),
                            night: (weather_data.list[2].temp.night-273).toFixed(),
                            show_param_name: "show_dat",
                            show:false,
                            show2: false,
                            show3: true,
                            city: weather_data.city.name,
                            day: this.getDAT().getDate(), 
                            month: app.getDAT().toLocaleString('ru', { month: 'long' }), 
                            year: this.getDAT().getFullYear(),
                            image: this.getImage(weather_data.list[2].weather[0].description)
                          }
                    ]
                    this.weather_list = weather_list;
            }).catch(
                error => {
                    console.log(error);
                    alert("Ошибка соединения с сервером. Пожалуйста, повторите попытку.");
                }
            );   
        },
        getNow: function(){
            var now = new Date();
            var day=now.getDate();
            var month=now.getMonth();
            var year=now.getFullYear();
            var now_json='{"day":'+now.getDate()+',"month":'+month+',"year":'+year+'}';
            return now_json;
        },
        getToday: function(){
            var get_json=this.getNow();
            var json=JSON.parse(get_json);
            var today=new Date(json.year, json.month, json.day);
            return today; 
        },    
        getTomorrow: function(){
            var get_json=this.getNow();
            var json=JSON.parse(get_json);
            var tomorrow=new Date(json.year, json.month, json.day+1);
            return tomorrow; 
        },  
        getDAT: function(){
            var get_json=this.getNow();
            var json=JSON.parse(get_json);
            var dat=new Date(json.year, json.month, json.day+2);
            return dat; 
        },
        getImage: function(text){
            var now = new Date();
            var hour=now.getHours()+1;
            if(hour>19 || hour<6){
                return text+" night";
            }
            else{
                return text;
            }
        },
        getTemperature: function(){
            var now = new Date();
            var hour=now.getHours()+1;
            if(hour>5 && hour<12){
                return (weather_data.list[0].temp.morn-273).toFixed();
            }
            else if(hour>=12 && hour<18){
               return (weather_data.list[0].temp.day-273).toFixed();
            }
            else if(hour>=18 && hour<=23){
                return (weather_data.list[0].temp.eve-273).toFixed();
            }
            else{
                return (weather_data.list[0].temp.night-273).toFixed();
            }
        }
  /*      getDay: function(event){
            var now = new Date();
            return now.getDate();
        },
        getMonth: function(event){
            var now = new Date();
            var day = now.getDate();
            return new Date().toLocaleString('ru', {       
                    month: 'long'       
            });       
        },
        getYear: function(event){
            var now = new Date();
            return now.getFullYear();     
        }, */
    },
});