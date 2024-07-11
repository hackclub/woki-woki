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
      return "";
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
      return "";
    case "board-esp32-devkit-c-v4":
      return "";
    case "board-ssd1306":
      return "";
  }
}

function outline(title, company, date, name){
    return  "LIB~0~-806~package`NONE`Manufacturer Part`?`spicePre`.`~~0~frame_lib_1~~~0~~yes~yes~~~#@$T~N~570.5~-809~0~#000080~Arial~~~~~comment~A~0~start~gge223~0~#@$PT~M 206 -796 L 206 -806 M 206 -10 L 206 0 M 402 -796 L 402 -806 M 402 -10 L 402 0 M 598 -796 L 598 -806 M 598 -10 L 598 0 M 794 -796 L 794 -806 M 794 -10 L 794 0 M 990 -796 L 990 -806 M 990 -10 L 990 0 M 10 -600 L 0 -600 M 1139 -600 L 1149 -600 M 10 -404 L 0 -404 M 1139 -404 L 1149 -404 M 10 -208 L 0 -208 M 1139 -208 L 1149 -208 M 10 -12 L 0 -12 M 1139 -12 L 1149 -12~#880000~1~0~none~gge10~0~frame_tick#@$T~P~571.5~-818~0~#000080~Arial~~~~~comment~A~0~start~gge220~0~#@$T~L~1.5~-698~0~#880000~~~~~~comment~A~1~start~gge13~0~frame_tick#@$T~L~1140.5~-698~0~#880000~~~~~~comment~A~1~start~gge19~0~frame_tick#@$T~L~1.5~-502~0~#880000~~~~~~comment~B~1~start~gge25~0~frame_tick#@$T~L~1140.5~-502~0~#880000~~~~~~comment~B~1~start~gge31~0~frame_tick#@$T~L~1.5~-306~0~#880000~~~~~~comment~C~1~start~gge37~0~frame_tick#@$T~L~1140.5~-306~0~#880000~~~~~~comment~C~1~start~gge43~0~frame_tick#@$T~L~1.5~-110~0~#880000~~~~~~comment~D~1~start~gge49~0~frame_tick#@$T~L~1140.5~-110~0~#880000~~~~~~comment~D~1~start~gge55~0~frame_tick#@$T~L~108~-797.5~0~#880000~~~~~~comment~1~1~start~gge61~0~frame_tick#@$T~L~108~-1.5~0~#880000~~~~~~comment~1~1~start~gge67~0~frame_tick#@$T~L~304~-797.5~0~#880000~~~~~~comment~2~1~start~gge73~0~frame_tick#@$T~L~304~-1.5~0~#880000~~~~~~comment~2~1~start~gge79~0~frame_tick#@$T~L~500~-797.5~0~#880000~~~~~~comment~3~1~start~gge85~0~frame_tick#@$T~L~500~-1.5~0~#880000~~~~~~comment~3~1~start~gge91~0~frame_tick#@$T~L~696~-797.5~0~#880000~~~~~~comment~4~1~start~gge97~0~frame_tick#@$T~L~696~-1.5~0~#880000~~~~~~comment~4~1~start~gge103~0~frame_tick#@$T~L~892~-797.5~0~#880000~~~~~~comment~5~1~start~gge109~0~frame_tick#@$T~L~892~-1.5~0~#880000~~~~~~comment~5~1~start~gge115~0~frame_tick#@$R~10~-796~~~1129~786~#880000~1~0~none~gge121~0~frame_innerbox#@$R~0~-806~~~1149~806~#880000~1~0~none~gge124~0~frame_outbox#@$R~694.99995~-90~~~444~80~#880000~1~0~none~gge127~0~frame_hitarea#@$PL~695.1 -50.75 1138.63 -50.75~#880000~1~0~none~gge130~0#@$PL~799.63 -30.75 1138.63 -30.75~#880000~1~0~none~gge133~0#@$PL~1059.61 -89.93 1059.63 -50.75~#880000~1~0~none~gge136~0#@$PL~1059.63 -50.75 1059.63 -30.75~#880000~1~0~none~gge139~0#@$T~L~699.99995~-77~0~#880000~~8pt~~~~comment~TITLE:~1~start~gge142~0~pinpart#@$T~L~757.62495~-64.41~0~#0000FF~~10pt~~~~comment~"+title+"~1~start~gge148~0~frame_title#@$T~L~1064.62495~-63.75~0~#880000~~8pt~~~~comment~REV:~1~start~gge154~0~pinpart#@$T~L~1102.62495~-63.75~0~#0000FF~~9pt~~~~comment~1.0~1~start~gge160~0~frame_version#@$T~L~804.62495~-15~0~#880000~~8pt~~~~comment~Date:~1~start~gge166~0~pinpart#@$T~L~851.62495~-14.52~0~#0000FF~~9pt~~~~comment~"+date+"~1~start~gge172~0~frame_date#@$T~L~1063.62495~-35~0~#880000~~8pt~~~~comment~Sheet:~1~start~gge178~0~pinpart#@$T~L~1108.62495~-34.52~0~#0000FF~~9pt~~~~comment~1/1~1~start~gge184~0~frame_sheet#@$T~L~943.62495~-14.75~0~#880000~~8pt~~~~comment~Drawn By:~1~start~gge190~0~pinpart#@$T~L~1008.63~-14.75~0~#0000FF~~9pt~~~~comment~"+name+"~1~start~gge196~0~frame_drawn#@$T~L~804.62495~-36.75~0~#880000~~8pt~~~~comment~Company:~1~start~gge202~0~pinpart#@$T~L~871.24995~-36.64~0~#0000FF~~9pt~~~~comment~"+company+"~1~start~gge208~0~frame_company#@$PL~799.63 -50.75 799.63 -10.75~#880000~1~0~none~gge214~0#@$Pimage~L~1~gge217~0~gge229~696~-40.5~102~20~data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTIwIg0KCSB2aWV3Qm94PSIwIDAgMTY5Mi45IDM0MS41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNjkyLjkgMzQxLjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM1NTg4RkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05MDEuNywxNjEuMWMyLjMtMS44LDUuMS0yLjcsOC4zLTIuN2M0LjMsMCw4LjksMS42LDEzLjgsNC43YzQuOSwzLjEsOS42LDgsMTQuMSwxNC43bDE3LjQtMjcuOQ0KCQljLTUuNC03LjgtMTIuMS0xMy45LTIwLjItMTguMmMtOC4xLTQuMy0xNi43LTYuNC0yNS43LTYuNGMtMTIuOCwwLTI0LDMuOS0zMy40LDExLjdjLTkuNCw3LjgtMTQuMSwxOC0xNC4xLDMwLjQNCgkJYzAsOC45LDMsMTcuNCw5LDI1LjRjNC4zLDUuNywxMi4xLDEyLjYsMjMuMywyMC42YzkuNyw2LjksMTUuNywxMS43LDE3LjksMTQuNGMyLjIsMi43LDMuMyw1LjMsMy4zLDcuOWMwLDMuMi0xLjQsNS45LTQuMyw4LjMNCgkJYy0yLjksMi4zLTYuNywzLjUtMTEuNSwzLjVjLTEyLjEsMC0yMy4zLTYuNy0zMy41LTIwLjJsLTIyLjUsMjYuMmMxMCwxMC42LDE5LjEsMTgsMjcuMiwyMmM4LjEsNCwxNy4yLDYsMjcuMSw2DQoJCWMxNy4yLDAsMzAuMy00LjksMzkuNC0xNC43YzkuMS05LjgsMTMuNi0yMC4zLDEzLjYtMzEuM2MwLTguNC0yLjItMTYuMS02LjYtMjMuM2MtNC40LTcuMS0xMy42LTE1LjctMjcuNi0yNS43DQoJCWMtOC44LTYuMy0xNC0xMC41LTE1LjctMTIuN2MtMS44LTIuMi0yLjctNC40LTIuNy02LjZDODk4LjIsMTY0LjksODk5LjQsMTYyLjksOTAxLjcsMTYxLjF6Ii8+DQoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxMDM4LjcsMjE3LjIgMTAwOS44LDEyOS4xIDk3NCwxMjkuMSAxMDE1LjgsMjU3LjQgOTczLjYsMzMyIDEwMTIuMSwzMzIgMTEyOC44LDEyOS4xIDEwODkuNSwxMjkuMSAJDQoJCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NTEuNSwxNTQuMWwtNzAuNCwwbDUuOC00MS43YzAsMCw3NC43LTAuMSw3NS4xLTAuMWM5LjgsMCwxNy44LTgsMTcuOC0xNy44YzAtOS44LTgtMTcuOC0xNy44LTE3LjgNCgkJYy0wLjMsMC0xMDguNCwwLTEwOC40LDBMNTI2LDI3Ny43aDExMy4ydjBjOS41LTAuMiwxNy4yLTgsMTcuMi0xNy41YzAtOS43LTcuOS0xNy42LTE3LjYtMTcuNmMtMC40LDAtNzAuMiwwLjEtNzAuMiwwLjFsNy40LTUzLjMNCgkJYzAsMCw3MS43LDAuMSw3Mi4zLDAuMWM5LjgsMCwxNy44LTgsMTcuOC0xNy44QzY2Ni4zLDE2Mi44LDY1OS45LDE1NS41LDY1MS41LDE1NC4xeiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjY4LjQsNzYuOGMtMC4zLDAtMTA4LjQsMC0xMDguNCwwbC0yNy40LDIwMC44aDExMy4zdjBjOS41LTAuMiwxNy4yLTgsMTcuMi0xNy41YzAtOS43LTcuOS0xNy42LTE3LjYtMTcuNg0KCQljLTAuNCwwLTcwLjIsMC4xLTcwLjIsMC4xbDcuNC01My4zYzAsMCw3MS43LDAuMSw3Mi40LDAuMWM5LjgsMCwxNy44LTgsMTcuOC0xNy44YzAtOC44LTYuNC0xNi4xLTE0LjgtMTcuNWwtNzAuNCwwbDUuOC00MS43DQoJCWMwLDAsNzQuNy0wLjEsNzUuMS0wLjFjOS44LDAsMTcuOC04LDE3LjgtMTcuOEMxMjg2LjIsODQuOCwxMjc4LjMsNzYuOCwxMjY4LjQsNzYuOHoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQ3MC43LDE3M2MwLTE5LjctNC42LTM3LjItMTMuNy01Mi4zYy05LjEtMTUuMS0yMC45LTI2LjItMzUuNS0zMy4yYy0xNC42LTcuMS0zNi43LTEwLjYtNjYuNi0xMC42aC0zMS44DQoJCWwtMjcuNCwyMDAuOGg2Mi40YzI2LjIsMCw0Ni43LTMuOSw2MS40LTExLjdjMTQuNy03LjgsMjctMjAuMiwzNi43LTM3LjFDMTQ2NS45LDIxMS45LDE0NzAuNywxOTMuMywxNDcwLjcsMTczeiBNMTQyMS4zLDIxNC41DQoJCWMtNy4zLDExLTE2LjksMTguOC0yOC45LDIzLjNjLTguNiwzLjItMjIuNCw0LjgtNDEuNSw0LjhoLTEyLjRsMTcuNy0xMzAuNGg5LjVjMTUuNSwwLDI3LjksMi40LDM3LjIsNy4zDQoJCWM5LjMsNC45LDE2LjUsMTEuOCwyMS43LDIwLjhjNS4xLDksNy43LDIwLjEsNy43LDMzLjRDMTQzMi4yLDE4OS44LDE0MjguNiwyMDMuNSwxNDIxLjMsMjE0LjV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2MTkuMiwxNzAuN2wtMjIuMywxMi4zYy0xLjgsMTYuMi0xNS42LDI4LjctMzIuMiwyOC43Yy0xNy45LDAtMzIuNC0xNC41LTMyLjQtMzIuNA0KCQljMC0xNy45LDE0LjUtMzIuNCwzMi40LTMyLjRjNi45LDAsMTMuMywyLjIsMTguNSw1LjhsMjcuNy0xNS4zbC0xNS02MC4yaC0zMS43bC0xMDgsMjAwaDQwLjRsMjIuOC00Mi42aDc5LjRsMTAuNiw0Mi42aDM2LjQNCgkJTDE2MTkuMiwxNzAuN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU1Mi44LDE3OC41YzAsNi45LDUuNiwxMi41LDEyLjUsMTIuNWM2LjksMCwxMi41LTUuNiwxMi41LTEyLjVjMC02LjktNS42LTEyLjUtMTIuNS0xMi41DQoJCUMxNTU4LjQsMTY2LDE1NTIuOCwxNzEuNiwxNTUyLjgsMTc4LjV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTgxNC44LDE1Mi41QzgxNC44LDE1Mi41LDgxNC44LDE1Mi40LDgxNC44LDE1Mi41bC0xMi41LDBsLTEuMy0yLjRjLTUuMS04LjEtMTEuNS0xNC4yLTE5LjItMTguNA0KCQljLTcuOC00LjItMjAuMS02LjMtMjkuMy02LjNjLTEzLjcsMC0yNi44LDMuNy0zOS4zLDExLjFjLTEyLjUsNy40LTIyLjUsMTcuNy0yOS45LDMxYy03LjQsMTMuMi0xMS4yLDI3LjItMTEuMiw0MS44DQoJCWMwLDE5LjIsNS44LDM2LDE3LjQsNTAuNWMxMS42LDE0LjUsMjcuMywyMS43LDQ3LDIxLjdjOC42LDAsMTYuMy0xLjQsMjMuMi00LjRjNi45LTIuOSwxNC4zLTgsMjIuMi0xNS40YzAsMCw5LjMsOC4xLDkuNCw4DQoJCWM1LjgsNC42LDEzLDcuNSwyMC44LDhoMy42bDAuNS00LjNsMTIuNy0xMDYuOWMtMC4xLDAtMC4xLDAtMC4yLDBDODI4LjcsMTU4LjgsODIyLjUsMTUyLjYsODE0LjgsMTUyLjV6IE03ODUuNiwyMjQuMg0KCQljLTQuNSw4LjUtMTAuMSwxNC44LTE2LjgsMTguOGMtNi43LDQtMTQuNSw2LTIzLjUsNmMtMTAuOCwwLTE5LjYtMy41LTI2LjUtMTAuN2MtNi45LTcuMS0xMC4zLTE2LjUtMTAuMy0yOC4xDQoJCWMwLTE1LjEsNC41LTI3LjQsMTMuNi0zN2M5LjEtOS42LDIwLjEtMTQuMywzMy4xLTE0LjNjMTEuMiwwLDIwLjIsMy42LDI3LDEwLjdjNi44LDcuMiwxMC4yLDE2LjYsMTAuMiwyOC40DQoJCUM3OTIuNCwyMDYuOSw3OTAuMSwyMTUuNyw3ODUuNiwyMjQuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDA0LjMsOTYuM2MtNy41LTE5LjktMTkuNy0zNy44LTM1LjgtNTIuM2MtMjQuNy0yMi4yLTU2LjctMzQuNS05MC0zNC41Yy0yOC44LDAtNTYuMyw5LTc5LjUsMjYNCgkJYy0xMS4yLDguMi0yMC45LDE3LjktMjguOSwyOC45Yy01LTAuNy0xMC4xLTEuMS0xNS4zLTEuMWMtMjguNywwLTU1LjgsMTEuMi03Ni4xLDMxLjVjLTIwLjMsMjAuMy0zMS41LDQ3LjMtMzEuNSw3Ni4xDQoJCWMwLDI2LjcsOS45LDUyLjMsMjcuOCw3Mi4xYzE0LjIsMTUuNywzMi42LDI2LjgsNTIuOSwzMmM4LjgsMjYuMiwzMy42LDQ1LjEsNjIuNyw0NS4xYzM2LjUsMCw2Ni4yLTI5LjcsNjYuMi02Ni4yDQoJCWMwLTIuMS0wLjEtNC4zLTAuMy02LjRsOTIuOS00OC44bC0yMC4zLTM1LjJsLTg4LjgsNDYuNmMtMTIuMS0xMy44LTI5LjktMjIuNS00OS43LTIyLjVjLTI4LjcsMC01My4yLDE4LjQtNjIuNCw0NA0KCQljLTIzLjQtMTAuMy0zOS44LTMzLjYtMzkuOC02MC44YzAtMzYuNiwyOS43LTY2LjQsNjYuNC02Ni40YzEyLjksMCwyNSwzLjcsMzUuMiwxMC4xYzEyLjMtMzcuMSw0Ny4zLTYzLjksODguNS02My45DQoJCWM0OCwwLDg3LjQsMzYuMiw5Mi43LDgyLjdjMS43LTAuMiwzLjQtMC4zLDUuMS0wLjNjMjguNywwLDUyLDIzLjMsNTIsNTJjMCwyNy4yLTIwLjksNDkuNS00Ny41LDUxLjhsLTI5LjcsMA0KCQljLTEuMy0wLjMtMi43LTAuNC00LjEtMC40Yy0xMS41LDAtMjAuOCw5LjMtMjAuOCwyMC44YzAsMTAuOSw4LjQsMTkuOCwxOS4xLDIwLjd2MC4ybDM1LjUsMGwxLjgsMGwxLjgtMC4yDQoJCWMyMy4yLTIsNDQuNy0xMi41LDYwLjUtMjkuN2MxNS45LTE3LjMsMjQuNy0zOS43LDI0LjctNjMuMkM0NjkuNiwxNDMuNiw0NDIuMSwxMDguMiw0MDQuMyw5Ni4zeiBNMTkwLjYsMjI4LjMNCgkJYzE0LjEsMCwyNS42LDExLjUsMjUuNiwyNS42YzAsMTQuMS0xMS41LDI1LjYtMjUuNiwyNS42Yy0xNC4xLDAtMjUuNi0xMS41LTI1LjYtMjUuNkMxNjUsMjM5LjgsMTc2LjUsMjI4LjMsMTkwLjYsMjI4LjN6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
}

//Other things

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
