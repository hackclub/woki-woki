const fs = require('fs');
const { get } = require('http');
const output = {};
const schematics = [{}];
const dataStr = {};
const head = {};
let shape = [];
let input = null; //Input object
  
convert();

function convert(){
    getinputs();

    //Write to output object
    
    //Hardcoded values
    addFieldToJsonObject(output, 'editorVersion', '6.5.44'); //This changes sometimes 
    addFieldToJsonObject(output, 'docType', '5');
    addFieldToJsonObject(output, 'title', (input.author + "'s bin project"));
    addFieldToJsonObject(output, 'description', 'This was a bin project converted to easyeda format');
    addFieldToJsonObject(output, 'colors', {});

        //Add to schematics object
        addFieldToJsonObject(schematics[0], 'docType', '1');
        addFieldToJsonObject(schematics[0], 'title', 'Sheet_1');
        addFieldToJsonObject(schematics[0], 'description', '');

            //Add to dataStr object
                //Add to head object
                addFieldToJsonObject(head, "docType", "1"); 
                addFieldToJsonObject(head, "editorVersion", "6.5.44"); //This changes sometimes
                addFieldToJsonObject(head, "newgId", true);
                addFieldToJsonObject(head, "c_para", {"Prefix Start": "1"});
                addFieldToJsonObject(head, "c_spiceCmd", "null");
                addFieldToJsonObject(head, "hasIdFlag", true);
                addFieldToJsonObject(head, "uuid", "b6cae5e0a8374c448006c40bff610dde"); //TO-DO: Implement these 
                addFieldToJsonObject(head, "x", "0");
                addFieldToJsonObject(head, "y", "0");
                addFieldToJsonObject(head, "portOfADImportHack", "");
                addFieldToJsonObject(head, "importFlag", 0);
                addFieldToJsonObject(head, "transformList", "");


    addFieldToJsonObject(dataStr, "head", head);

    addFieldToJsonObject(dataStr, "canvas", "CA~1000~1000~#FFFFFF~yes~#CCCCCC~5~1000~1000~line~5~pixel~5~0~0");
    //---------------------------------------------------------------------------------------------------------------------------
    //Adding all the shapes 
    shape.push(outline((input.author + "'s bin project"), "Hack Club", (getFormattedDate()), input.author)); //Default schemma outline 
    for(let i = 0; i < input.parts.length; i++){
        shape.push(placeComponentHeaders(input.parts[i].id, input.parts[i].top, input.parts[i].left));
    }


    //---------------------------------------------------------------------------------------------------------------------------
    addFieldToJsonObject(dataStr, "shape", shape); 
    addFieldToJsonObject(dataStr, "BBox", {"x": 0, "y": -806.6, "width": 1149, "height": 807.1}); //TO-DO: Implement these
    addFieldToJsonObject(dataStr, "colors", {});



    addFieldToJsonObject(schematics[0], 'dataStr', dataStr);

    addFieldToJsonObject(output, 'schematics', schematics);
    writeToJsonFile(output);
}

//Getting inputs from json
function getinputs(){
    let rawdata = fs.readFileSync('input.json', { encoding: 'utf8', flag: 'r' });
    input = (JSON.parse(rawdata));
    console.log("Input found")
}

//Output to output.json file
function writeToJsonFile(data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync('output.json', jsonString, { encoding: 'utf8', flag: 'w' });
    console.log('JSON file has been saved.');
  }

//Add fields to the json object
  function addFieldToJsonObject(obj, fieldName, fieldValue) {
    obj[fieldName] = fieldValue;
  }


//Components--------------------------------------------------------------------------------------------------------------------------------

function placeComponentHeaders(id, x, y){
  switch(id){
    case "wokwi-pushbutton":
      return "";
    case "wokwi-pir-motion-sensor":
      return "";
    case "wokwi-buzzer":  
      return "";
    case "wokwi-dht22":
      return "";
    case "wokwi-led":
      return "";
    case "wokwi-photoresistor-sensor":
      return "";
    case "wokwi-neopixel":
      return "";
    case "wokwi-rgb-led":
      return "";
    case "wokwi-ir-receiver":
      return "LIB~71~-701~package`FLAME-DETECTOR`Contributor`Thafhan Fathur Rahman`spicePre`?`spiceSymbolName`FLAME-DETECTOR`Manufacturer Part``~90~0~gge1fe2828c22e3785d~4bc7823e4c1f4cc5a9703837010046c7~74fe4c6f89e54f8598321a11974dadbc~0~~yes~yes~~~#@$T~N~66.67~-772.69~0~#000080~Arial~~~~~comment~FLAME-DETECTOR~1~start~gge242~0~#@$T~P~67.78~-781.91~0~#000080~Arial~~~~~comment~KY-026~1~start~gge248~0~#@$P~show~3~1~55~-630~270~gge254~0^^55~-630^^M 55 -630 v -19.685~#A54B4B^^1~57.95~-659.21~270~VCC~start~~4.5pt~#A54B4B^^1~53.03~-637.56~270~1~end~~4.5pt~#A54B4B^^0~55~-646^^0~M 58 -649 L 55 -652 L 52 -649#@$P~show~3~2~65~-630~270~gge275~0^^65~-630^^M 65 -630 v -19.685~#A54B4B^^1~67.95~-659.21~270~GND~start~~4.5pt~#A54B4B^^1~63.03~-637.56~270~2~end~~4.5pt~#A54B4B^^0~65~-646^^0~M 68 -649 L 65 -652 L 62 -649#@$P~show~3~3~75~-630~270~gge296~0^^75~-630^^M 75 -630 v -19.685~#A54B4B^^1~77.95~-659.21~270~DO~start~~4.5pt~#A54B4B^^1~73.03~-637.56~270~3~end~~4.5pt~#A54B4B^^0~75~-646^^0~M 78 -649 L 75 -652 L 72 -649#@$P~show~3~4~85~-630~270~gge317~0^^85~-630^^M 85 -630 v -19.685~#A54B4B^^1~87.95~-659.21~270~AO~start~~4.5pt~#A54B4B^^1~83.03~-637.56~270~4~end~~4.5pt~#A54B4B^^0~85~-646^^0~M 88 -649 L 85 -652 L 82 -649#@$PL~35 -649.69 35 -769.69~#A54B4B~1~0~none~gge338~0#@$PL~35 -769.69 55 -769.69~#A54B4B~1~0~none~gge341~0#@$PL~55 -769.69 85 -769.69~#A54B4B~1~0~none~gge344~0#@$PL~85 -769.69 105 -769.69~#A54B4B~1~0~none~gge347~0#@$PL~105 -769.69 105 -649.69~#A54B4B~1~0~none~gge350~0#@$PL~105 -649.69 35 -649.69~#A54B4B~1~0~none~gge353~0#@$PL~55 -769.69 55 -729.69~#A54B4B~1~0~none~gge356~0#@$PL~55 -729.69 85 -729.69~#A54B4B~1~0~none~gge359~0#@$PL~85 -729.69 85 -769.69~#A54B4B~1~0~none~gge362~0#@$T~L~73.5~-743.39~270~#A54B4B~~5.4pt~0.56~~text-after-edge~comment~DET~1~start~gge365~0~pinpart";
    case "wokwi-max7219-matrix":
      return "";
    case "wokwi-hc-sr04":
      return "";
    case "wokwi-analog-joystick":
      return "";
    case "wokwi-relay-module":
      return "";
    case "wokwi-potentiometer":
      return "";
    case "wokwi-ntc-temperature-sensor":
      return "";
    case "wokwi-mpu6050":
      return "";
    case "wokwi-membrane-keypad":
      return "";
    case "wokwi-lcd1602":
      return "";
    case "board-ds18b20":
      return "";
    case "wokwi-slide-potentiometer":
      return "";
    case "wokwi-servo":
      return "";
    case "wokwi-stepper-motor":
      return "";
    case "wokwi-74hc595":
      return "";
    case "wokwi-ky-040":
      return "";
    case "wokwi-ds1307":
      return "";
    case "wokwi-pi-pico":
      return "LIB~585~-425~package`COMM-SMD_L51.0-W21.0-P2.54_SC0916`Supplier`LCSC`Supplier Part`C7203002`Manufacturer`Raspberry Pi(树莓派)`Manufacturer Part`PICO`JLCPCB Part Class`Extended Part`Contributor`lcsc`spicePre`U`spiceSymbolName`PICO`~~0~ggeaa774782f320c1a5~5d84ef3ed8e343a2bdb183e5818fa66e~b9b9a06d23174667b20865bf106293e2~0~~yes~yes~~1702350048~#@$T~N~512.62~-552.25~0~#000080~Arial~~~~~comment~PICO~1~start~gge1324~0~#@$T~P~512.62~-561.88~0~#000080~Arial~~~~~comment~U1~1~start~gge1330~0~#@$R~525~-530~2~2~115~210~#880000~1~0~none~gge1336~0~#@$E~530~-525~1.5~1.5~#880000~1~0~#880000~gge1339~0#@$P~show~0~1~515~-520~180~gge1342~0^^515~-520^^M 515 -520 h 10~#880000^^1~528.7~-516~0~GP0~start~~~#0000FF^^1~524.5~-521~0~1~end~~~#0000FF^^0~522~-520^^0~M 525 -517 L 528 -520 L 525 -523#@$P~show~0~2~515~-510~180~gge1363~0^^515~-510^^M 515 -510 h 10~#880000^^1~528.7~-506~0~GP1~start~~~#0000FF^^1~524.5~-511~0~2~end~~~#0000FF^^0~522~-510^^0~M 525 -507 L 528 -510 L 525 -513#@$P~show~0~3~515~-500~180~gge1384~0^^515~-500^^M 515 -500 h 10~#000000^^1~528.7~-496~0~GND~start~~~#000000^^1~524.5~-501~0~3~end~~~#000000^^0~522~-500^^0~M 525 -497 L 528 -500 L 525 -503#@$P~show~0~4~515~-490~180~gge1405~0^^515~-490^^M 515 -490 h 10~#880000^^1~528.7~-486~0~GP2~start~~~#0000FF^^1~524.5~-491~0~4~end~~~#0000FF^^0~522~-490^^0~M 525 -487 L 528 -490 L 525 -493#@$P~show~0~5~515~-480~180~gge1426~0^^515~-480^^M 515 -480 h 10~#880000^^1~528.7~-476~0~GP3~start~~~#0000FF^^1~524.5~-481~0~5~end~~~#0000FF^^0~522~-480^^0~M 525 -477 L 528 -480 L 525 -483#@$P~show~0~6~515~-470~180~gge1447~0^^515~-470^^M 515 -470 h 10~#880000^^1~528.7~-466~0~GP4~start~~~#0000FF^^1~524.5~-471~0~6~end~~~#0000FF^^0~522~-470^^0~M 525 -467 L 528 -470 L 525 -473#@$P~show~0~7~515~-460~180~gge1468~0^^515~-460^^M 515 -460 h 10~#880000^^1~528.7~-456~0~GP5~start~~~#0000FF^^1~524.5~-461~0~7~end~~~#0000FF^^0~522~-460^^0~M 525 -457 L 528 -460 L 525 -463#@$P~show~0~8~515~-450~180~gge1489~0^^515~-450^^M 515 -450 h 10~#000000^^1~528.7~-446~0~GND~start~~~#000000^^1~524.5~-451~0~8~end~~~#000000^^0~522~-450^^0~M 525 -447 L 528 -450 L 525 -453#@$P~show~0~9~515~-440~180~gge1510~0^^515~-440^^M 515 -440 h 10~#880000^^1~528.7~-436~0~GP6~start~~~#0000FF^^1~524.5~-441~0~9~end~~~#0000FF^^0~522~-440^^0~M 525 -437 L 528 -440 L 525 -443#@$P~show~0~10~515~-430~180~gge1531~0^^515~-430^^M 515 -430 h 10~#880000^^1~528.7~-426~0~GP7~start~~~#0000FF^^1~524.5~-431~0~10~end~~~#0000FF^^0~522~-430^^0~M 525 -427 L 528 -430 L 525 -433#@$P~show~0~11~515~-420~180~gge1552~0^^515~-420^^M 515 -420 h 10~#880000^^1~528.7~-416~0~GP8~start~~~#0000FF^^1~524.5~-421~0~11~end~~~#0000FF^^0~522~-420^^0~M 525 -417 L 528 -420 L 525 -423#@$P~show~0~12~515~-410~180~gge1573~0^^515~-410^^M 515 -410 h 10~#880000^^1~528.7~-406~0~GP9~start~~~#0000FF^^1~524.5~-411~0~12~end~~~#0000FF^^0~522~-410^^0~M 525 -407 L 528 -410 L 525 -413#@$P~show~0~13~515~-400~180~gge1594~0^^515~-400^^M 515 -400 h 10~#000000^^1~528.7~-396~0~GND~start~~~#000000^^1~524.5~-401~0~13~end~~~#000000^^0~522~-400^^0~M 525 -397 L 528 -400 L 525 -403#@$P~show~0~14~515~-390~180~gge1615~0^^515~-390^^M 515 -390 h 10~#880000^^1~528.7~-386~0~GP10~start~~~#0000FF^^1~524.5~-391~0~14~end~~~#0000FF^^0~522~-390^^0~M 525 -387 L 528 -390 L 525 -393#@$P~show~0~15~515~-380~180~gge1636~0^^515~-380^^M 515 -380 h 10~#880000^^1~528.7~-376~0~GP11~start~~~#0000FF^^1~524.5~-381~0~15~end~~~#0000FF^^0~522~-380^^0~M 525 -377 L 528 -380 L 525 -383#@$P~show~0~16~515~-370~180~gge1657~0^^515~-370^^M 515 -370 h 10~#880000^^1~528.7~-366~0~GP12~start~~~#0000FF^^1~524.5~-371~0~16~end~~~#0000FF^^0~522~-370^^0~M 525 -367 L 528 -370 L 525 -373#@$P~show~0~17~515~-360~180~gge1678~0^^515~-360^^M 515 -360 h 10~#880000^^1~528.7~-356~0~GP13~start~~~#0000FF^^1~524.5~-361~0~17~end~~~#0000FF^^0~522~-360^^0~M 525 -357 L 528 -360 L 525 -363#@$P~show~0~18~515~-350~180~gge1699~0^^515~-350^^M 515 -350 h 10~#000000^^1~528.7~-346~0~GND~start~~~#000000^^1~524.5~-351~0~18~end~~~#000000^^0~522~-350^^0~M 525 -347 L 528 -350 L 525 -353#@$P~show~0~19~515~-340~180~gge1720~0^^515~-340^^M 515 -340 h 10~#880000^^1~528.7~-336~0~GP14~start~~~#0000FF^^1~524.5~-341~0~19~end~~~#0000FF^^0~522~-340^^0~M 525 -337 L 528 -340 L 525 -343#@$P~show~0~20~515~-330~180~gge1741~0^^515~-330^^M 515 -330 h 10~#880000^^1~528.7~-326~0~GP15~start~~~#0000FF^^1~524.5~-331~0~20~end~~~#0000FF^^0~522~-330^^0~M 525 -327 L 528 -330 L 525 -333#@$P~show~0~21~650~-330~0~gge1762~0^^650~-330^^M 650 -330 h -10~#880000^^1~636.3~-326~0~GP16~end~~~#0000FF^^1~640.5~-331~0~21~start~~~#0000FF^^0~643~-330^^0~M 640 -333 L 637 -330 L 640 -327#@$P~show~0~22~650~-340~0~gge1783~0^^650~-340^^M 650 -340 h -10~#880000^^1~636.3~-336~0~GP17~end~~~#0000FF^^1~640.5~-341~0~22~start~~~#0000FF^^0~643~-340^^0~M 640 -343 L 637 -340 L 640 -337#@$P~show~0~23~650~-350~0~gge1804~0^^650~-350^^M 650 -350 h -10~#000000^^1~636.3~-346~0~GND~end~~~#000000^^1~640.5~-351~0~23~start~~~#000000^^0~643~-350^^0~M 640 -353 L 637 -350 L 640 -347#@$P~show~0~24~650~-360~0~gge1825~0^^650~-360^^M 650 -360 h -10~#880000^^1~636.3~-356~0~GP18~end~~~#0000FF^^1~640.5~-361~0~24~start~~~#0000FF^^0~643~-360^^0~M 640 -363 L 637 -360 L 640 -357#@$P~show~0~25~650~-370~0~gge1846~0^^650~-370^^M 650 -370 h -10~#880000^^1~636.3~-366~0~GP19~end~~~#0000FF^^1~640.5~-371~0~25~start~~~#0000FF^^0~643~-370^^0~M 640 -373 L 637 -370 L 640 -367#@$P~show~0~26~650~-380~0~gge1867~0^^650~-380^^M 650 -380 h -10~#880000^^1~636.3~-376~0~GP20~end~~~#0000FF^^1~640.5~-381~0~26~start~~~#0000FF^^0~643~-380^^0~M 640 -383 L 637 -380 L 640 -377#@$P~show~0~27~650~-390~0~gge1888~0^^650~-390^^M 650 -390 h -10~#880000^^1~636.3~-386~0~GP21~end~~~#0000FF^^1~640.5~-391~0~27~start~~~#0000FF^^0~643~-390^^0~M 640 -393 L 637 -390 L 640 -387#@$P~show~0~28~650~-400~0~gge1909~0^^650~-400^^M 650 -400 h -10~#000000^^1~636.3~-396~0~GND~end~~~#000000^^1~640.5~-401~0~28~start~~~#000000^^0~643~-400^^0~M 640 -403 L 637 -400 L 640 -397#@$P~show~0~29~650~-410~0~gge1930~0^^650~-410^^M 650 -410 h -10~#880000^^1~636.3~-406~0~GP22~end~~~#0000FF^^1~640.5~-411~0~29~start~~~#0000FF^^0~643~-410^^0~M 640 -413 L 637 -410 L 640 -407#@$P~show~0~30~650~-420~0~gge1951~0^^650~-420^^M 650 -420 h -10~#880000^^1~636.3~-416~0~RUN~end~~~#0000FF^^1~640.5~-421~0~30~start~~~#0000FF^^0~643~-420^^0~M 640 -423 L 637 -420 L 640 -417#@$P~show~0~31~650~-430~0~gge1972~0^^650~-430^^M 650 -430 h -10~#880000^^1~636.3~-426~0~GP26~end~~~#0000FF^^1~640.5~-431~0~31~start~~~#0000FF^^0~643~-430^^0~M 640 -433 L 637 -430 L 640 -427#@$P~show~0~32~650~-440~0~gge1993~0^^650~-440^^M 650 -440 h -10~#880000^^1~636.3~-436~0~GP27~end~~~#0000FF^^1~640.5~-441~0~32~start~~~#0000FF^^0~643~-440^^0~M 640 -443 L 637 -440 L 640 -437#@$P~show~0~33~650~-450~0~gge2014~0^^650~-450^^M 650 -450 h -10~#000000^^1~636.3~-446~0~GND~end~~~#000000^^1~640.5~-451~0~33~start~~~#000000^^0~643~-450^^0~M 640 -453 L 637 -450 L 640 -447#@$P~show~0~34~650~-460~0~gge2035~0^^650~-460^^M 650 -460 h -10~#880000^^1~636.3~-456~0~GP28~end~~~#0000FF^^1~640.5~-461~0~34~start~~~#0000FF^^0~643~-460^^0~M 640 -463 L 637 -460 L 640 -457#@$P~show~0~35~650~-470~0~gge2056~0^^650~-470^^M 650 -470 h -10~#880000^^1~636.3~-466~0~ADC_VREF~end~~~#0000FF^^1~640.5~-471~0~35~start~~~#0000FF^^0~643~-470^^0~M 640 -473 L 637 -470 L 640 -467#@$P~show~0~36~650~-480~0~gge2077~0^^650~-480^^M 650 -480 h -10~#880000^^1~636.3~-476~0~3V3(OUT)~end~~~#0000FF^^1~640.5~-481~0~36~start~~~#0000FF^^0~643~-480^^0~M 640 -483 L 637 -480 L 640 -477#@$P~show~0~37~650~-490~0~gge2098~0^^650~-490^^M 650 -490 h -10~#880000^^1~636.3~-486~0~3V3_EN~end~~~#0000FF^^1~640.5~-491~0~37~start~~~#0000FF^^0~643~-490^^0~M 640 -493 L 637 -490 L 640 -487#@$P~show~0~38~650~-500~0~gge2119~0^^650~-500^^M 650 -500 h -10~#000000^^1~636.3~-496~0~GND~end~~~#000000^^1~640.5~-501~0~38~start~~~#000000^^0~643~-500^^0~M 640 -503 L 637 -500 L 640 -497#@$P~show~0~39~650~-510~0~gge2140~0^^650~-510^^M 650 -510 h -10~#880000^^1~636.3~-506~0~VSYS~end~~~#0000FF^^1~640.5~-511~0~39~start~~~#0000FF^^0~643~-510^^0~M 640 -513 L 637 -510 L 640 -507#@$P~show~0~40~650~-520~0~gge2161~0^^650~-520^^M 650 -520 h -10~#880000^^1~636.3~-516~0~VBUS~end~~~#0000FF^^1~640.5~-521~0~40~start~~~#0000FF^^0~643~-520^^0~M 640 -523 L 637 -520 L 640 -517#@$P~show~0~41~575~-310~270~gge2182~0^^575~-310^^M 575 -310 v -10~#880000^^1~578~-322~270~SWCLK~start~~~#0000FF^^1~574~-320~270~41~end~~~#0000FF^^0~575~-317^^0~M 578 -320 L 575 -323 L 572 -320#@$P~show~0~42~585~-310~270~gge2203~0^^585~-310^^M 585 -310 v -10~#880000^^1~588~-322~270~GND~start~~~#0000FF^^1~584~-320~270~42~end~~~#0000FF^^0~585~-317^^0~M 588 -320 L 585 -323 L 582 -320#@$P~show~0~43~595~-310~270~gge2224~0^^595~-310^^M 595 -310 v -10~#880000^^1~598~-322~270~SWDIO~start~~~#0000FF^^1~594~-320~270~43~end~~~#0000FF^^0~595~-317^^0~M 598 -320 L 595 -323 L 592 -320#@$P~show~0~TP1~555~-540~90~gge2245~0^^555~-540^^M 555 -540 v 10~#880000^^1~558~-528~270~TP1~end~~~#0000FF^^1~554~-530~270~TP1~start~~~#0000FF^^0~555~-533^^0~M 552 -530 L 555 -527 L 558 -530#@$P~show~0~2~565~-540~90~gge2266~0^^565~-540^^M 565 -540 v 10~#880000^^1~568~-528~270~TP2~end~~~#0000FF^^1~564~-530~270~TP2~start~~~#0000FF^^0~565~-533^^0~M 562 -530 L 565 -527 L 568 -530#@$P~show~0~3~575~-540~90~gge2287~0^^575~-540^^M 575 -540 v 10~#880000^^1~578~-528~270~TP3~end~~~#0000FF^^1~574~-530~270~TP3~start~~~#0000FF^^0~575~-533^^0~M 572 -530 L 575 -527 L 578 -530#@$P~show~0~4~585~-540~90~gge2308~0^^585~-540^^M 585 -540 v 10~#880000^^1~588~-528~270~TP4~end~~~#0000FF^^1~584~-530~270~TP4~start~~~#0000FF^^0~585~-533^^0~M 582 -530 L 585 -527 L 588 -530#@$P~show~0~5~595~-540~90~gge2329~0^^595~-540^^M 595 -540 v 10~#880000^^1~598~-528~270~TP5~end~~~#0000FF^^1~594~-530~270~TP5~start~~~#0000FF^^0~595~-533^^0~M 592 -530 L 595 -527 L 598 -530#@$P~show~0~6~605~-540~90~gge2350~0^^605~-540^^M 605 -540 v 10~#880000^^1~608~-528~270~TP6~end~~~#0000FF^^1~604~-530~270~TP6~start~~~#0000FF^^0~605~-533^^0~M 602 -530 L 605 -527 L 608 -530";
    case "board-esp32-devkit-c-v4":
      return "";
    case "board-ssd1306":
      return "";
  }
}

function outline(title, company, date, name){
    return "LIB~0~-806~package`NONE`Manufacturer Part`?`spicePre`.`~~0~frame_lib_1~~~0~~yes~yes~~~#@$T~N~570.5~-809~0~#000080~Arial~~~~~comment~A~0~start~gge223~0~#@$PT~M 206 -796 L 206 -806 M 206 -10 L 206 0 M 402 -796 L 402 -806 M 402 -10 L 402 0 M 598 -796 L 598 -806 M 598 -10 L 598 0 M 794 -796 L 794 -806 M 794 -10 L 794 0 M 990 -796 L 990 -806 M 990 -10 L 990 0 M 10 -600 L 0 -600 M 1139 -600 L 1149 -600 M 10 -404 L 0 -404 M 1139 -404 L 1149 -404 M 10 -208 L 0 -208 M 1139 -208 L 1149 -208 M 10 -12 L 0 -12 M 1139 -12 L 1149 -12~#880000~1~0~none~gge10~0~frame_tick#@$T~P~571.5~-818~0~#000080~Arial~~~~~comment~A~0~start~gge220~0~#@$T~L~1.5~-698~0~#880000~~~~~~comment~A~1~start~gge13~0~frame_tick#@$T~L~1140.5~-698~0~#880000~~~~~~comment~A~1~start~gge19~0~frame_tick#@$T~L~1.5~-502~0~#880000~~~~~~comment~B~1~start~gge25~0~frame_tick#@$T~L~1140.5~-502~0~#880000~~~~~~comment~B~1~start~gge31~0~frame_tick#@$T~L~1.5~-306~0~#880000~~~~~~comment~C~1~start~gge37~0~frame_tick#@$T~L~1140.5~-306~0~#880000~~~~~~comment~C~1~start~gge43~0~frame_tick#@$T~L~1.5~-110~0~#880000~~~~~~comment~D~1~start~gge49~0~frame_tick#@$T~L~1140.5~-110~0~#880000~~~~~~comment~D~1~start~gge55~0~frame_tick#@$T~L~108~-797.5~0~#880000~~~~~~comment~1~1~start~gge61~0~frame_tick#@$T~L~108~-1.5~0~#880000~~~~~~comment~1~1~start~gge67~0~frame_tick#@$T~L~304~-797.5~0~#880000~~~~~~comment~2~1~start~gge73~0~frame_tick#@$T~L~304~-1.5~0~#880000~~~~~~comment~2~1~start~gge79~0~frame_tick#@$T~L~500~-797.5~0~#880000~~~~~~comment~3~1~start~gge85~0~frame_tick#@$T~L~500~-1.5~0~#880000~~~~~~comment~3~1~start~gge91~0~frame_tick#@$T~L~696~-797.5~0~#880000~~~~~~comment~4~1~start~gge97~0~frame_tick#@$T~L~696~-1.5~0~#880000~~~~~~comment~4~1~start~gge103~0~frame_tick#@$T~L~892~-797.5~0~#880000~~~~~~comment~5~1~start~gge109~0~frame_tick#@$T~L~892~-1.5~0~#880000~~~~~~comment~5~1~start~gge115~0~frame_tick#@$R~10~-796~~~1129~786~#880000~1~0~none~gge121~0~frame_innerbox#@$R~0~-806~~~1149~806~#880000~1~0~none~gge124~0~frame_outbox#@$R~694.99995~-90~~~444~80~#880000~1~0~none~gge127~0~frame_hitarea#@$PL~695.1 -50.75 1138.63 -50.75~#880000~1~0~none~gge130~0#@$PL~799.63 -30.75 1138.63 -30.75~#880000~1~0~none~gge133~0#@$PL~1059.61 -89.93 1059.63 -50.75~#880000~1~0~none~gge136~0#@$PL~1059.63 -50.75 1059.63 -30.75~#880000~1~0~none~gge139~0#@$T~L~699.99995~-77~0~#880000~~8pt~~~~comment~TITLE:~1~start~gge142~0~pinpart#@$T~L~757.62495~-64.41~0~#0000FF~~10pt~~~~comment~"+title+"~1~start~gge148~0~frame_title#@$T~L~1064.62495~-63.75~0~#880000~~8pt~~~~comment~REV:~1~start~gge154~0~pinpart#@$T~L~1102.62495~-63.75~0~#0000FF~~9pt~~~~comment~1.0~1~start~gge160~0~frame_version#@$T~L~804.62495~-15~0~#880000~~8pt~~~~comment~Date:~1~start~gge166~0~pinpart#@$T~L~851.62495~-14.52~0~#0000FF~~9pt~~~~comment~"+date+"~1~start~gge172~0~frame_date#@$T~L~1063.62495~-35~0~#880000~~8pt~~~~comment~Sheet:~1~start~gge178~0~pinpart#@$T~L~1108.62495~-34.52~0~#0000FF~~9pt~~~~comment~1/1~1~start~gge184~0~frame_sheet#@$T~L~943.62495~-14.75~0~#880000~~8pt~~~~comment~Drawn By:~1~start~gge190~0~pinpart#@$T~L~1008.63~-14.75~0~#0000FF~~9pt~~~~comment~"+name+"~1~start~gge196~0~frame_drawn#@$T~L~804.62495~-36.75~0~#880000~~8pt~~~~comment~Company:~1~start~gge202~0~pinpart#@$T~L~871.24995~-36.64~0~#0000FF~~9pt~~~~comment~"+company+"~1~start~gge208~0~frame_company#@$PL~799.63 -50.75 799.63 -10.75~#880000~1~0~none~gge214~0#@$Pimage~L~1~gge217~0~gge229~696~-40.5~102~20~data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTIwIg0KCSB2aWV3Qm94PSIwIDAgMTY5Mi45IDM0MS41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNjkyLjkgMzQxLjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM1NTg4RkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05MDEuNywxNjEuMWMyLjMtMS44LDUuMS0yLjcsOC4zLTIuN2M0LjMsMCw4LjksMS42LDEzLjgsNC43YzQuOSwzLjEsOS42LDgsMTQuMSwxNC43bDE3LjQtMjcuOQ0KCQljLTUuNC03LjgtMTIuMS0xMy45LTIwLjItMTguMmMtOC4xLTQuMy0xNi43LTYuNC0yNS43LTYuNGMtMTIuOCwwLTI0LDMuOS0zMy40LDExLjdjLTkuNCw3LjgtMTQuMSwxOC0xNC4xLDMwLjQNCgkJYzAsOC45LDMsMTcuNCw5LDI1LjRjNC4zLDUuNywxMi4xLDEyLjYsMjMuMywyMC42YzkuNyw2LjksMTUuNywxMS43LDE3LjksMTQuNGMyLjIsMi43LDMuMyw1LjMsMy4zLDcuOWMwLDMuMi0xLjQsNS45LTQuMyw4LjMNCgkJYy0yLjksMi4zLTYuNywzLjUtMTEuNSwzLjVjLTEyLjEsMC0yMy4zLTYuNy0zMy41LTIwLjJsLTIyLjUsMjYuMmMxMCwxMC42LDE5LjEsMTgsMjcuMiwyMmM4LjEsNCwxNy4yLDYsMjcuMSw2DQoJCWMxNy4yLDAsMzAuMy00LjksMzkuNC0xNC43YzkuMS05LjgsMTMuNi0yMC4zLDEzLjYtMzEuM2MwLTguNC0yLjItMTYuMS02LjYtMjMuM2MtNC40LTcuMS0xMy42LTE1LjctMjcuNi0yNS43DQoJCWMtOC44LTYuMy0xNC0xMC41LTE1LjctMTIuN2MtMS44LTIuMi0yLjctNC40LTIuNy02LjZDODk4LjIsMTY0LjksODk5LjQsMTYyLjksOTAxLjcsMTYxLjF6Ii8+DQoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxMDM4LjcsMjE3LjIgMTAwOS44LDEyOS4xIDk3NCwxMjkuMSAxMDE1LjgsMjU3LjQgOTczLjYsMzMyIDEwMTIuMSwzMzIgMTEyOC44LDEyOS4xIDEwODkuNSwxMjkuMSAJDQoJCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NTEuNSwxNTQuMWwtNzAuNCwwbDUuOC00MS43YzAsMCw3NC43LTAuMSw3NS4xLTAuMWM5LjgsMCwxNy44LTgsMTcuOC0xNy44YzAtOS44LTgtMTcuOC0xNy44LTE3LjgNCgkJYy0wLjMsMC0xMDguNCwwLTEwOC40LDBMNTI2LDI3Ny43aDExMy4ydjBjOS41LTAuMiwxNy4yLTgsMTcuMi0xNy41YzAtOS43LTcuOS0xNy42LTE3LjYtMTcuNmMtMC40LDAtNzAuMiwwLjEtNzAuMiwwLjFsNy40LTUzLjMNCgkJYzAsMCw3MS43LDAuMSw3Mi4zLDAuMWM5LjgsMCwxNy44LTgsMTcuOC0xNy44QzY2Ni4zLDE2Mi44LDY1OS45LDE1NS41LDY1MS41LDE1NC4xeiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjY4LjQsNzYuOGMtMC4zLDAtMTA4LjQsMC0xMDguNCwwbC0yNy40LDIwMC44aDExMy4zdjBjOS41LTAuMiwxNy4yLTgsMTcuMi0xNy41YzAtOS43LTcuOS0xNy42LTE3LjYtMTcuNg0KCQljLTAuNCwwLTcwLjIsMC4xLTcwLjIsMC4xbDcuNC01My4zYzAsMCw3MS43LDAuMSw3Mi40LDAuMWM5LjgsMCwxNy44LTgsMTcuOC0xNy44YzAtOC44LTYuNC0xNi4xLTE0LjgtMTcuNWwtNzAuNCwwbDUuOC00MS43DQoJCWMwLDAsNzQuNy0wLjEsNzUuMS0wLjFjOS44LDAsMTcuOC04LDE3LjgtMTcuOEMxMjg2LjIsODQuOCwxMjc4LjMsNzYuOCwxMjY4LjQsNzYuOHoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQ3MC43LDE3M2MwLTE5LjctNC42LTM3LjItMTMuNy01Mi4zYy05LjEtMTUuMS0yMC45LTI2LjItMzUuNS0zMy4yYy0xNC42LTcuMS0zNi43LTEwLjYtNjYuNi0xMC42aC0zMS44DQoJCWwtMjcuNCwyMDAuOGg2Mi40YzI2LjIsMCw0Ni43LTMuOSw2MS40LTExLjdjMTQuNy03LjgsMjctMjAuMiwzNi43LTM3LjFDMTQ2NS45LDIxMS45LDE0NzAuNywxOTMuMywxNDcwLjcsMTczeiBNMTQyMS4zLDIxNC41DQoJCWMtNy4zLDExLTE2LjksMTguOC0yOC45LDIzLjNjLTguNiwzLjItMjIuNCw0LjgtNDEuNSw0LjhoLTEyLjRsMTcuNy0xMzAuNGg5LjVjMTUuNSwwLDI3LjksMi40LDM3LjIsNy4zDQoJCWM5LjMsNC45LDE2LjUsMTEuOCwyMS43LDIwLjhjNS4xLDksNy43LDIwLjEsNy43LDMzLjRDMTQzMi4yLDE4OS44LDE0MjguNiwyMDMuNSwxNDIxLjMsMjE0LjV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2MTkuMiwxNzAuN2wtMjIuMywxMi4zYy0xLjgsMTYuMi0xNS42LDI4LjctMzIuMiwyOC43Yy0xNy45LDAtMzIuNC0xNC41LTMyLjQtMzIuNA0KCQljMC0xNy45LDE0LjUtMzIuNCwzMi40LTMyLjRjNi45LDAsMTMuMywyLjIsMTguNSw1LjhsMjcuNy0xNS4zbC0xNS02MC4yaC0zMS43bC0xMDgsMjAwaDQwLjRsMjIuOC00Mi42aDc5LjRsMTAuNiw0Mi42aDM2LjQNCgkJTDE2MTkuMiwxNzAuN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU1Mi44LDE3OC41YzAsNi45LDUuNiwxMi41LDEyLjUsMTIuNWM2LjksMCwxMi41LTUuNiwxMi41LTEyLjVjMC02LjktNS42LTEyLjUtMTIuNS0xMi41DQoJCUMxNTU4LjQsMTY2LDE1NTIuOCwxNzEuNiwxNTUyLjgsMTc4LjV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTgxNC44LDE1Mi41QzgxNC44LDE1Mi41LDgxNC44LDE1Mi40LDgxNC44LDE1Mi41bC0xMi41LDBsLTEuMy0yLjRjLTUuMS04LjEtMTEuNS0xNC4yLTE5LjItMTguNA0KCQljLTcuOC00LjItMjAuMS02LjMtMjkuMy02LjNjLTEzLjcsMC0yNi44LDMuNy0zOS4zLDExLjFjLTEyLjUsNy40LTIyLjUsMTcuNy0yOS45LDMxYy03LjQsMTMuMi0xMS4yLDI3LjItMTEuMiw0MS44DQoJCWMwLDE5LjIsNS44LDM2LDE3LjQsNTAuNWMxMS42LDE0LjUsMjcuMywyMS43LDQ3LDIxLjdjOC42LDAsMTYuMy0xLjQsMjMuMi00LjRjNi45LTIuOSwxNC4zLTgsMjIuMi0xNS40YzAsMCw5LjMsOC4xLDkuNCw4DQoJCWM1LjgsNC42LDEzLDcuNSwyMC44LDhoMy42bDAuNS00LjNsMTIuNy0xMDYuOWMtMC4xLDAtMC4xLDAtMC4yLDBDODI4LjcsMTU4LjgsODIyLjUsMTUyLjYsODE0LjgsMTUyLjV6IE03ODUuNiwyMjQuMg0KCQljLTQuNSw4LjUtMTAuMSwxNC44LTE2LjgsMTguOGMtNi43LDQtMTQuNSw2LTIzLjUsNmMtMTAuOCwwLTE5LjYtMy41LTI2LjUtMTAuN2MtNi45LTcuMS0xMC4zLTE2LjUtMTAuMy0yOC4xDQoJCWMwLTE1LjEsNC41LTI3LjQsMTMuNi0zN2M5LjEtOS42LDIwLjEtMTQuMywzMy4xLTE0LjNjMTEuMiwwLDIwLjIsMy42LDI3LDEwLjdjNi44LDcuMiwxMC4yLDE2LjYsMTAuMiwyOC40DQoJCUM3OTIuNCwyMDYuOSw3OTAuMSwyMTUuNyw3ODUuNiwyMjQuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDA0LjMsOTYuM2MtNy41LTE5LjktMTkuNy0zNy44LTM1LjgtNTIuM2MtMjQuNy0yMi4yLTU2LjctMzQuNS05MC0zNC41Yy0yOC44LDAtNTYuMyw5LTc5LjUsMjYNCgkJYy0xMS4yLDguMi0yMC45LDE3LjktMjguOSwyOC45Yy01LTAuNy0xMC4xLTEuMS0xNS4zLTEuMWMtMjguNywwLTU1LjgsMTEuMi03Ni4xLDMxLjVjLTIwLjMsMjAuMy0zMS41LDQ3LjMtMzEuNSw3Ni4xDQoJCWMwLDI2LjcsOS45LDUyLjMsMjcuOCw3Mi4xYzE0LjIsMTUuNywzMi42LDI2LjgsNTIuOSwzMmM4LjgsMjYuMiwzMy42LDQ1LjEsNjIuNyw0NS4xYzM2LjUsMCw2Ni4yLTI5LjcsNjYuMi02Ni4yDQoJCWMwLTIuMS0wLjEtNC4zLTAuMy02LjRsOTIuOS00OC44bC0yMC4zLTM1LjJsLTg4LjgsNDYuNmMtMTIuMS0xMy44LTI5LjktMjIuNS00OS43LTIyLjVjLTI4LjcsMC01My4yLDE4LjQtNjIuNCw0NA0KCQljLTIzLjQtMTAuMy0zOS44LTMzLjYtMzkuOC02MC44YzAtMzYuNiwyOS43LTY2LjQsNjYuNC02Ni40YzEyLjksMCwyNSwzLjcsMzUuMiwxMC4xYzEyLjMtMzcuMSw0Ny4zLTYzLjksODguNS02My45DQoJCWM0OCwwLDg3LjQsMzYuMiw5Mi43LDgyLjdjMS43LTAuMiwzLjQtMC4zLDUuMS0wLjNjMjguNywwLDUyLDIzLjMsNTIsNTJjMCwyNy4yLTIwLjksNDkuNS00Ny41LDUxLjhsLTI5LjcsMA0KCQljLTEuMy0wLjMtMi43LTAuNC00LjEtMC40Yy0xMS41LDAtMjAuOCw5LjMtMjAuOCwyMC44YzAsMTAuOSw4LjQsMTkuOCwxOS4xLDIwLjd2MC4ybDM1LjUsMGwxLjgsMGwxLjgtMC4yDQoJCWMyMy4yLTIsNDQuNy0xMi41LDYwLjUtMjkuN2MxNS45LTE3LjMsMjQuNy0zOS43LDI0LjctNjMuMkM0NjkuNiwxNDMuNiw0NDIuMSwxMDguMiw0MDQuMyw5Ni4zeiBNMTkwLjYsMjI4LjMNCgkJYzE0LjEsMCwyNS42LDExLjUsMjUuNiwyNS42YzAsMTQuMS0xMS41LDI1LjYtMjUuNiwyNS42Yy0xNC4xLDAtMjUuNi0xMS41LTI1LjYtMjUuNkMxNjUsMjM5LjgsMTc2LjUsMjI4LjMsMTkwLjYsMjI4LjN6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
}

//Other things

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
