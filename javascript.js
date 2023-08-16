
function add(num1, num2){
    return Math.round((num1 + num2)*10000)/10000
}

function subtract(num1, num2){
    return Math.round((num1 - num2)*10000)/10000
}

function multiply(num1, num2){
    return Math.round(num1*num2*10000)/10000
}

function divide(num1, num2){
    return Math.round(num1*10000/num2)/10000
}

function modulo(num1, num2){
    return Math.round(num1*10000%num2)/10000
}

function operate(operate, num1, num2){
    let intNum1 = parseFloat(num1)
    let intNum2 = parseFloat(num2)
    if (operate === "+"){
        return add(intNum1,intNum2)
    } else if (operate === "-"){
        return subtract(intNum1, intNum2)
    } else if (operate === "/"){
        if (num2 === "0"){
            return("divide by 0 error")
        }
        return divide(intNum1,intNum2)
    } else if (operate === "%"){
        if(num2 === "0"){
            return("divide by 0 error")
        }
        return modulo (intNum1, intNum2)
    } else if (operate === "x"){
        return multiply(intNum1,intNum2)
    }
}

const buttons = document.querySelectorAll(".buttons"); 
let textCalculatorScreen = document.querySelector(".text");
let operators = document.querySelectorAll(".operator");
let valsBefore = "";
let operator = false
let operateType;
let valsAfter = "";
let calculation;
let equalsClicked;
let lastOperator;
let operatorList = ["+", "-", "/", "%", "x"]
buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        const clickedItem = event.target;

        if (equalsClicked && !clickedItem.classList.contains("operator")) {
            // textCalculatorScreen.textContent = '';
            equalsClicked = false;
        }

        if (clickedItem.id === "equals"){
            if (operatorList.includes(textCalculatorScreen.textContent.slice(-1))){
                return;
            }

        }
        

        if (clickedItem.classList.contains("number")) {
            // if (textCalculatorScreen.textContent.slice(0) === "0"){
            //     textCalculatorScreen.textContent = clickedItem.textContent

            textCalculatorScreen.textContent += clickedItem.textContent;
            
            if (!operator){
                valsBefore += clickedItem.textContent;
            } else {
                valsAfter += clickedItem.textContent; 
            } 
        }
            

        // if (clickedItem.classList.contains("operator")){

        //     if (textCalculatorScreen.textContent===""){
        //         return;
        //     }
        //     if (operator){
        //         if(operatorList.includes(textCalculatorScreen.textContent.slice(-1))){
        //             return;
        //         } else {
        //             calculation = operate(operateType,valsBefore,valsAfter)
        //             textCalculatorScreen.textContent =  String(calculation) ;
        //             valsBefore = String(calculation)
        //             valsAfter = ""
        //             equalsClicked = true
        //             operator = false
        //         }
        //     }
        //     valsBefore = textCalculatorScreen.textContent;
        //     textCalculatorScreen.textContent += clickedItem.textContent;
        //     operateType = clickedItem.textContent;
        //     operator = true;

        // }
        if (clickedItem.classList.contains("operator")) {
            if (textCalculatorScreen.textContent === "") {
                return;
            }
        
            if (!operator) {
                valsBefore = textCalculatorScreen.textContent;
            }
        
            if (operator) {
                if(operatorList.includes(textCalculatorScreen.textContent.slice(-1))) {
                    return;
                } else {
                    calculation = operate(operateType, valsBefore, valsAfter);
                    if (isNaN(calculation)) { 
                        textCalculatorScreen.textContent = "Error"; 
                        return; 
                    }
                    textCalculatorScreen.textContent = String(calculation);
                    valsBefore = String(calculation);
                    valsAfter = "";
                    equalsClicked = true;
                    operator = false;
                }
            }
        
            textCalculatorScreen.textContent += clickedItem.textContent;
            operateType = clickedItem.textContent;
            operator = true;
        }
        

        if (clickedItem.id === "equals" && operator){
            if (equalsClicked){
                return;
            } else {
                calculation = operate(operateType,valsBefore,valsAfter)
                textCalculatorScreen.textContent =  String(calculation);
                valsBefore = String(calculation)
                valsAfter = ""
                equalsClicked = true
                operator = false

            }
            
        }

        if (clickedItem.id === "del"){
            if (operator) {
                if (operatorList.includes(textCalculatorScreen.textContent.slice(-1))){
                    operator = false
                }
                valsAfter = valsAfter.slice(0,-1)
                textCalculatorScreen.textContent = textCalculatorScreen.textContent.slice(0,-1)
            } else if (!operator)  {
                valsBefore = valsBefore.slice(0,-1)
                textCalculatorScreen.textContent = textCalculatorScreen.textContent.slice(0,-1)
            } 
        }

        if (clickedItem.id === "ac"){
            textCalculatorScreen.textContent = "";
            valsBefore = "";
            operator = false;
            operateType;
            valsAfter = "";
            calculation = "";
        }

    });
});

