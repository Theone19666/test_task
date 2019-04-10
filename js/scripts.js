var app=new Vue({
	el:"#app",
	data:{
        show_today:true,
        show_tom:false,
        show_dat:false,
        weather_data:''
    },
    mounted:function(){
        this.getWeather();
    },
    methods: {
        getWeather: function(event) {
            axios.get('https://gist.githubusercontent.com/anonymous/feb1b31516f3e36a14b29657701f18d2/raw/eaa544aed7e3bdee37c6caa2a515f1d4c38fbd4f/weather.json').then(response => {
                //this.response = console.log(response);
                weather_data=response.data;
                console.log(weather_data);
                console.log((weather_data.list[0].temp.day-273).toFixed());
            }).catch(
                error => {
                    console.log(error);
                    alert("Ошибка");
                }
            );   
        },
        drawWeather: function(event){
            var now = new Date();
/*            if(now.getHours()>5 && now.getHours()<12){
                
            } */
        }
    },
    computed: {}
});
app.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Удалить</button>\
    </li>\
  ',
  props: ['title']
})