const StorageKey = 'pixelPlants'
var MasterGameObjects = []
const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };
function PlantObj (ID, name, posX, posY, variety, element) {
    this.ID = ID ? ID : uniqueId();
    this.name = name; //string
    this.born = moment().format(); //moment object 
    this.timeToMature = moment().hours(2); //int (time in ms)
    this.isMature = false; //is the plant matured?
    this.pos = { x:posX, y:posY};
    this.variety = variety;
};

const GameObjects = {
    'pot':{
        size:{h:50,w:50},
        img:'',
        background:'firebrick',
        get style(){ return `background:${this.background};height:${this.size.h}px;width:${this.size.w}px`}
    }
}

function centerGameObjPosToClick(click, obj){
    return {x:click.x - (obj.w/2), y:click.y - (obj.h/2)};
}
function createGameObj(options){
    // let centerPos = centerGameObjPosToClick(options.pos,GameObjects[options.variety].size);
    let element = `<div class="gameObj ${options.variety}" style="top:${options.pos.y}px;left:${options.pos.x}px;"></div>`;
    MasterGameObjects.push(new PlantObj(options.ID, 'pot',options.pos.x,options.pos.y, options.variety));
    // Storage.save(MasterGameObjects,StorageKey,true);
    return $('body').append(element);
}
function createGameObjs(array){
    $.each(array,function(i,val){
        createGameObj(val);
    })
}
$(document).on('click',function(e){
    let clickPos = {x:e.pageX, y:e.pageY};
    console.log(clickPos);
    $.when(createGameObj({variety:'pot',pos:clickPos})).then(function(){
        Storage.save(MasterGameObjects,StorageKey,true);
    });
})
$(document).on('click','.gameObj',function(){

})
$(document).ready(function(){
    let tryLoad = Storage.load(StorageKey);
    if(tryLoad != false){
        // MasterGameObjects = tryLoad;
        createGameObjs(tryLoad);
    }
});