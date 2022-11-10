let selectMenu = document.querySelectorAll('select'), 
currentTime = document.querySelector('h1'), 
alarmContainer = document.querySelector('.alarm-time'),
alarmButton = document.querySelector('button');

let alarmTime,  
alarmRingtone = new Audio('./ringtone.mp3'), 
isAlarmSet = false;

for(let i = 1; i <= 12; i++){
    i = i  < 10 ? `0${i}`: i ;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].insertAdjacentHTML("beforeend", option);    //insertAdjacentHTML: inert tag with text
                                                              //positions: beforebegin afterbegin beforeend afterend  (wrt tag to which inserted here selectMenu[0])
}

for(let i = 0; i <= 59; i++){
    i = i  < 10 ? `0${i}`: i ;
    // let option = `<option value="${i}">${i}</option>`;
    // selectMenu[1].insertAdjacentHTML("beforeend", option);
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectMenu[1].append(option);
}

for(let i = 0; i < 2; i++){
    let setampm = i  < 1 ? `AM`: `PM` ;
    let option = `<option value="${setampm}">${setampm}</option>`;
    selectMenu[2].insertAdjacentHTML("beforeend", option);
}                                                     //   these 3 for loops are to set option content for hour, minute  and seconds 

setInterval(() => {
    let date = new Date();
    let h = date.getHours(); 
    let m = date.getMinutes(); 
    let s = date.getSeconds();

    setampm = h < 12 ? `AM` : `PM`;    //if hour < 12 the set AM, else PM
    h = h >= 12 ? h - 12 : h ;         //if hour is >=12 then hour  = hour - 12 (eg. 13 = 13-12  = 1 ) else no change 
    h = h < 10 ? `0${h}` : h;      //if hour, minute, second is less than 10 let'say 3 then it will be set to 03 else no change
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    currentTime.innerText = `${h}:${m}:${s} ${setampm}`; 

    if(alarmTime == `${h}:${m} ${setampm}`){         //check for the current hour, minute, am/pm value with the set alarm value
        console.log('Alarm ringing..')               //if equal, alarm starts ringing
        alarmRingtone.play(); //audio starts playing
        alarmRingtone.loop = true;    //in loop
    }
    
});   //time delay not set, default to be taken is 0


function setAlarm(){

    if(isAlarmSet){
        alarmTime = "";   //Clear value of alarm
        alarmRingtone.pause();                  //ringtone pause
        alarmButton.innerText = "Set Alarm";         //innertext changed back to normal
        alarmContainer.classList.remove('disable');        //classlist.remove is used to remove the given class
        isAlarmSet = false;
        return;
    }
    
    let time  = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;    //taking the value of the alarm so set
    
    if(time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')){  //includes() method determines whether a string contains the given characters within it or not
        return alert('Invalid time!');                                                //returns true if the charcters are present else return false;
    }

    alarmContainer.classList.add('disable');    //classlist.add is used to add a class to the particular element
    alarmButton.innerText = "Clear Alarm";    //replace the text with Clear alarm

    alarmTime = time;     //value of the alarm copied to alarmtime to compare it with the cuurent time in setinterval method
    console.log(alarmTime);
    console.log("alarm ringing...");
    isAlarmSet = true;     //value set to true
}

alarmButton.addEventListener('click', setAlarm);    //on clicking the alarmbutton, setAlarm funciton will be called

