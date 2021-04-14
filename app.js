document.querySelector(".apply").addEventListener("click", () => changeStyle());
document.querySelector(".reset").addEventListener("click", () => resetStyle());

const colorSettings = ["red", "green", "black", "blue"];
const textDecorationSettings = ["none", "blink", "line-through", "overline", "underline"];
const fontWeightSettings = ["normal", "lighter", "bold", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const colorSelector = document.querySelector("#text-color")
const textDecorationSelector = document.querySelector("#text-decoration")
const fontWeightSelector = document.querySelector("#font-weight")


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
}


function loadContetnEditor() {

    document.querySelector(".text-editor__canvas").innerHTML = localStorage.getItem("text-editor")

}

function saveContetnEditor() {

    let lastUPD = document.querySelector(".text-editor__canvas").innerHTML
    localStorage.setItem("text-editor", lastUPD);

}

function resetStyle() {

    let contentAfterReset = document.querySelector(".text-editor__canvas").innerText;

    document.querySelector(".text-editor__canvas").innerText = contentAfterReset;

    saveContetnEditor();
}

function changeStyle() {

    const rang = getSelection();

    if (rang.rangeCount == 1) {

        document.querySelector('.error').innerText = "";
        const boundaries = rang.getRangeAt(0);

        if (boundaries.startContainer == boundaries.endContainer) {

            const text = rang.anchorNode.textContent;

            const elem = document.createElement('span')
            elem.innerText = rang.toString();
            elem.style.color = document.querySelector("#text-color").value;
            elem.style.fontSize = document.querySelector("#font-size").value + "px";
            elem.style.textDecoration = document.querySelector("#text-decoration").value;
            elem.style.fontWeight = document.querySelector("#font-weight").value;
            elem.style.letterSpacing = document.querySelector("#letter-spacing").value + "px";
            elem.style.lineHeight = document.querySelector("#line-height").value;

            const arr = text.split("");

            arr.splice(boundaries.startOffset, rang.toString().length, elem.outerHTML);

            const elemInsert = document.createElement('span');
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
        document.querySelector('.error').innerText = "*text is not selected"
    }


}

