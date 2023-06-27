const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-SearchWeather]');
const userContainer = document.querySelector('.weather-container');

const grantAcessConatiner = document.querySelector('.Grant-location-container');
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.User-Info-container');

//initainlly varable need

let currentTab = userTab;

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");
getfromSessionStroge();

//switchTab function

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");


        if(! searchForm.classList.contains('active')){
            userInfoContainer.classList.remove('active');
            grantAcessConatiner.classList.remove('active');
            searchForm.classList.add('active');
    
        }
        else{
            //main phle search  wale tab pr tha 
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');
            //check local location
            getfromSessionStroge();
    
        }
    }

}

userTab.addEventListener('click',()=>{
//pass clicked tab
    switchTab(userTab);
});

searchTab.addEventListener('click',()=>{
    //pass clicked tab
        switchTab(searchTab);
    });



    function getfromSessionStroge(){
        const localCordinates = sessionStorage.getItem("usercordinates");
        if(!localCordinates){
            //agr local cordinates save nhee h
            grantAcessConatiner.classList.add("active");
        }

        else{
            const cordinates = JSON.parse(localCordinates);
            fetchWeatherInfo(cordinates);
        }
    }



    // function for weather Info
 async function  fetchWeatherInfo(cordinates){
    
    const {lat ,lon} = cordinates;
    console.log(cordinates);

    // make grantaccess invisible

    grantAcessConatiner.classList.remove('active');

    //make loader visible
    loadingScreen.classList.add('active');


    //API call

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove('active');

        userInfoContainer.classList.add('active');

        randerWeatherInfo(data);

    }

catch(err){
loadingScreen.classList.remove("active");
//hw
}
    }


    function randerWeatherInfo(weatherInfo){
        //first facth the element
        const cityName = document.querySelector('[data-cityName]');
        const countryIcon = document.querySelector('[data-countryIcon]');
         const desc = document.querySelector('[data-weather_dis]');
const weatherIcon = document.querySelector('[data-weatherIcon]');
const temp  = document.querySelector("[data-temp]");

 const windSpeed = document.querySelector('[data-windspeed]');
 const humidity = document.querySelector('[data-humidity]');
 const cloudiness = document.querySelector('[data-clouds]');

 //fatch values from APIA and show on UI


 cityName.innerText = weatherInfo?.name;
 countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
 desc.innerText = weatherInfo?.weather?.[0]?.description;
 weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
 temp.innerText = `${weatherInfo?.main?.temp} °C`;
 windSpeed.innerText =`${ weatherInfo?.wind?.speed} m/s`;
 
 humidity.innerText = `${weatherInfo?.main?.humidity} %`;
 cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

         }


 function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition);
    }
    else{
        //show error
    }
 }        

 function showposition(position){
    const usercordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }
    sessionStorage.setItem("usercordinates", JSON.stringify(usercordinates));
    fetchWeatherInfo(usercordinates);
 }
         //event listen on grant

  const grantAcessBtn = document.querySelector('[data-GrantAccess]');
  
  grantAcessBtn.addEventListener('click',getlocation);


  const searchInput = document.querySelector('[ data-searchInput]');
  searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let city = searchInput.value;
    if(city ==""){
        return ;

    }
    else{
        fatchSearchWeather(city);
    }
  });


  async function fatchSearchWeather(city){
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAcessConatiner.classList.remove('active');

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          
          const data = await response.json();
          loadingScreen.classList.remove('active');
          userInfoContainer.classList.add('active');
        //   searchForm.classList.remove('active');
          randerWeatherInfo(data);
          console.log(data);
    }
    catch(e){
        console.log("earror found",e);
    }
  }