document.querySelector(".apply").addEventListener("click", () => changeStyle());
document.querySelector(".reset").addEventListener("click", () => resetStyle());

const colorSettings = ["red", "green", "black", "blue"];
const textDecorationSettings = ["none", "blink", "line-through", "overline", "underline"];
const fontWeightSettings = ["normal", "lighter", "bold", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
const fontSizeSettings = [8, 9, 10, 11, 12, 14, 18, 24, 36];
const letterSpacingSettings = ['normal',1,2,3,4,5,6];

const colorSelector = document.querySelector("#text-color")
const textDecorationSelector = document.querySelector("#text-decoration")
const fontWeightSelector = document.querySelector("#font-weight")
const fontSizeSelector = document.querySelector("#font-size")
const letterSpacingSelector = document.querySelector("#letter-spacing")
const lineHeightSelector = document.querySelector("#line-height")

const canvas = document.querySelector(".text-editor__canvas")
const error = document.querySelector('.error');


window.onload = setups(), loadContetnEditor();

function setups() {

    colorSettings.forEach(element => {
        colorSelector.append(new Option(element));
    });

    textDecorationSettings.forEach(element => {
        textDecorationSelector.append(new Option(element));
    });

    fontWeightSettings.forEach(element => {
        fontWeightSelector.append(new Option(element));
    });

    fontSizeSettings.forEach(element => {
        fontSizeSelector.append(new Option(element));
    });

    letterSpacingSettings.forEach(element => {
        letterSpacingSelector.append(new Option(element));
    });
}


function loadContetnEditor() {

    canvas.innerHTML = localStorage.getItem("text-editor")

}

function saveContetnEditor() {

    let lastUPD = canvas.innerHTML
    localStorage.setItem("text-editor", lastUPD);

}

function resetStyle() {

    let contentAfterReset = canvas.innerText;

    canvas.innerText = contentAfterReset;

    saveContetnEditor();
}

function changeStyle() {

    const rang = getSelection();

    if (rang.rangeCount == 1 && canvas.contains(rang.anchorNode)) {

        error.innerText = "";
        const boundaries = rang.getRangeAt(0);


        if (boundaries.startContainer == boundaries.endContainer) {

            const text = rang.anchorNode.textContent;

            const elem = document.createElement('span')
            elem.innerText = rang.toString();
            elem.style.color = colorSelector.value;
            elem.style.fontSize = fontSizeSelector.value + "px";
            elem.style.textDecoration = textDecorationSelector.value;
            elem.style.fontWeight = fontWeightSelector.value;
            elem.style.letterSpacing = letterSpacingSelector.value + "px";
            elem.style.lineHeight = lineHeightSelector.value;

            const arr = text.split("");

            arr.splice(boundaries.startOffset, rang.toString().length, elem.outerHTML);

            const elemInsert = document.createElement('p');
            elemInsert.innerHTML = arr.join("");



            rang.anchorNode.parentNode.childNodes.forEach(element => {

                if (element == rang.anchorNode) {
                    rang.anchorNode.parentNode.replaceChild(elemInsert, element)
                }

            });

            saveContetnEditor();

        } else {

        }

    }
    else {
        error.innerText = "*text is not selected"
    }


}

