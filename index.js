function Slide(){

    this.table = window.document.querySelector(".variations")
    var varibles = window.document.querySelectorAll(".variations tbody tr")
    this.resetselect = window.document.querySelector(".reset_variations")
    var nr = Array.prototype.slice.call(varibles)
    this.varibles = varibles
    this.color = "#a7885b";
    this.count = 0

    this.buttonone = null
    this.buttontwo = null

    let c = 0

    function reset(){
        for(var i = 0; i < varibles.length ; i++){
            varibles[i].style.display = "none"
        }
    }

    function style(){
        for(var i = 0; i < varibles.length ; i++){
            varibles[i].style.marginBottom = "10px"
        }
    }

    function indexOfElement(index){
        return varibles[index].querySelector("select").value
    }

    this.elementForeach = function(callback){
        Object.keys(varibles).forEach(function(e){
            callback(e)
        })
    }

    this.createElement = function(name = ""){
        var varibles = this.table
        varibles.setAttribute("style","position:relative;")
        
        console.log(this.varibles)


        var buttonone = document.createElement("div")
        var buttontwo = document.createElement("div")

        buttonone.textContent = "anterios".toUpperCase()
        buttontwo.textContent = "próximo".toUpperCase()

        buttonone.setAttribute("class","buttononesgt")
        buttontwo.setAttribute("class","buttontwosgt")

        buttonone.setAttribute("style","line-height: 22px;font-family:'Oswald',sans-serif;width:85px;text-align:center;height:22px;background-color:"+this.color+";font-size:11px !important;color:#fff;cursor:pointer;")
        buttontwo.setAttribute("style","line-height: 22px;font-family:'Oswald',sans-serif;width:85px;text-align:center;height:22px;background-color:"+this.color+";font-size:11px !important;color:#fff;cursor:pointer;")


        var buttons = document.createElement("div")
        buttons.setAttribute("style","position: absolute;right:0; top:10px; width:175px; height:22px;display:flex;justify-content:space-between;align-items: center;flex-flow: row nowrap;")

        buttons.appendChild(buttonone)
        buttons.appendChild(buttontwo)

        varibles.appendChild(buttons)
    }


    this.prevPreview = function(){
        this.buttonone = document.querySelector(".buttononesgt")
        var varibles = this.varibles 

        this.buttonone.addEventListener("click",function(e){
            var ele =indexOfElement(nr.indexOf(varibles[varibles.length - 1]))
            
            if(ele == "" || ele == null || typeof ele == undefined){
                return
            }

            reset()
            --c
            if(c < 0){
               c = varibles.length - 1
            }
            console.log(c)
            varibles[c].style.display = "block"
        })
    }

    this.nextPreview = function(){
        this.buttontwo = document.querySelector(".buttontwosgt")
        var varibles = this.varibles
        this.buttontwo.addEventListener("click",function(e){
            var ele =indexOfElement(nr.indexOf(varibles[c]))
            
            if(ele == "" || ele == null || typeof ele == undefined){
                return
            }
            reset()

            ++c
            if(c == varibles.length){
                c = 0
            }
            
            varibles[c].style.display = "block"
        })
    }


    this.startObject = function(){
        reset()
        style()
        console.log(varibles.length)
        this.elementForeach(function(e){
            console.log(e)
            varibles[e].addEventListener('change',function(e){
                reset()
                console.log(c,"antes")
                c++
                if(c == varibles.length ){
                    return
                }
                console.log(c,"depois")
                varibles[c].style.display = "block"
                console.log(c,"dipois do display block")
            })
        })
    }

    this.resetSelect = function(){
        var resetselect = this.resetselect
        resetselect.addEventListener('click',function(e){
            reset()
            c = 0
            varibles[c].style.display = "block"
        })
    }

}

Slide.prototype.startComponent = function(){

    let varibles = this.varibles

    let buttonPrev = this.prevPreview.bind(this)
    let buttonNext = this.nextPreview.bind(this)

    let createButtons = this.createElement.bind(this)
    let start = this.startObject.bind(this)

    let resetSelect = this.resetSelect.bind(this)

    var count = 0

    createButtons()
    start()
    buttonPrev()
    buttonNext()

    resetSelect()

    varibles[0].style.display = "block"

}
new Slide().startComponent()