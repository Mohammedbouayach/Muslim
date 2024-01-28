// 

let ahadith = document.querySelector(".ahadith");
let ahadithsection= document.getElementById("ahadith")

let next = document.querySelector(".buttons .next");

let prev = document.querySelector(".buttons .prev")

let numberahadith = document.querySelector(".numberahadith");

let btnmove = document.getElementById("btnmove");

let ahadithindex = 0;

btnmove.addEventListener("click",()=>{
 ahadithsection.scrollIntoView();
}
)

hadithnumber()

function hadithnumber(){
 fetch("https://api.hadith.gading.dev/books/muslim?range=1-300").then(response=>response.json()).then(data=>{
  let adiths= data.data.hadiths;
  ahadith.innerText = adiths[ahadithindex].arab
 })
 
 numberahadith.innerText = `300 / ${ahadithindex +1}`
}

next.onclick = ()=>{
if (ahadithindex < 300) {
  ahadithindex += 1;
}
 hadithnumber()
}
prev.onclick = ()=>{
 if (ahadithindex >0) {
  ahadithindex -= 1;
 }
 hadithnumber()
}

// quran section



    
    let azkarindex = 0;
    
getadkar()
    function getadkar(){
     fetch("https://api.dikiotang.com/dzikir/pagi").then(response=>response.json()).then(data=>{
     //console.log(data)
       let azkar = data.data;
      let azkarcontainer= document.querySelector(".azkar-container");
      let azkars = document.querySelector(".azkars");
      let numberazkar= document.querySelector(".numberazkar")
      
      azkars.innerText = azkar[azkarindex].arab;
      
      numberazkar.innerHTML=`(${azkar[azkarindex].ulang})`
      
      console.log(data)
      
      
     })
     
     
    }
    
    let moveleft = document.querySelector("#moveleft")
        let moveright = document.querySelector("#moveright")
    
    moveleft.onclick = function(){
     if (azkarindex<22) {
      azkarindex +=1
     }
     getadkar()
    };
    
    moveright.onclick = function(){
     if (azkarindex>0) {
      azkarindex -=1
     }
     getadkar()
    }
    
    let load = document.querySelector(".loader");
    
    
    function lod(){
     load.style.display="none"
     
    }
setTimeout(lod,3000);


let apiurl = "https://mp3quran.net/api/v3";
let lng = "ar";

async function getriciters(){
  
  let getQarie = document.querySelector("#getQarie")
  const res = await fetch(`${apiurl}/reciters?language=${lng}`)
  const data= await res.json()
  getQarie.innerHTML = `        <option value="">إختر القارئ</option>`
  data.reciters.forEach(riciter=>{
    
    getQarie.innerHTML += `        <option value="${riciter.id}">${riciter.name}</option>`
  });
  getQarie.addEventListener("change",(e)=>
    getMushaf(e.target.value)
  )
  
}
getriciters()

async function getMushaf(riciter){
  const res = await fetch(`${apiurl}/reciters?language=${lng}&reciter=${riciter}`)
  const data= await res.json()
  let moshafs=data.reciters[0].moshaf
  let getmushaf = document.querySelector("#getmushaf");
  getmushaf.innerHTML = `        <option value="">إختر المصحف</option>`
  moshafs.forEach(moshaf=>{
    
    getmushaf.innerHTML += `        <option value="${moshaf.id}" data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}">${moshaf.name}</option>`
  });
  getmushaf.addEventListener("change",e=>{
    const selectmushaf = getmushaf.options[getmushaf.selectedIndex]
    
    let suraserver=selectmushaf.dataset.server;
  let suralist = selectmushaf.dataset.surahlist
getSurah(suraserver,suralist)
    
  })
  
}
async function getSurah(suraserver,suralist) {
  const getSura = document.querySelector("#getSura")
const res = await fetch(`https://mp3quran.net/api/v3/suwar`)
  const data= await res.json()
const suranemes = data.suwar;
suralist=suralist.split(",");
getSura.innerHTML = `        <option value="">إختر السورة</option>`
suralist.forEach(sura=>{
  let padsura = sura.padStart(3,'0')
  suranemes.forEach( suraname=>{
        if (suraname.id==sura) {
         
          getSura.innerHTML += `        <option value="${suraserver}${padsura}.mp3">${suraname.name}</option>`
        }
      }
    )
  
})
getSura.addEventListener("change",e=>{
    const selectsura = getSura.options[getSura.selectedIndex];
    playsura(selectsura.value)
    
})

}
function playsura(suramp3){
  let audioplayer = document.querySelector("#audioplayer");
  audioplayer.src=suramp3;
 audioplayer.play()

}