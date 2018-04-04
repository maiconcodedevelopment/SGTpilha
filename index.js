function Slide(){

    this.table = window.document.querySelector(".variations")
    var varibles = window.document.querySelectorAll(".variations tbody tr")
    var vselect = window.document.querySelectorAll(".variations tbody tr select")
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

        buttonone.textContent = "anterior".toUpperCase()
        buttontwo.textContent = "próximo".toUpperCase()

        buttonone.setAttribute("class","buttononesgt")
        buttontwo.setAttribute("class","buttontwosgt")

        buttonone.setAttribute("style","line-height: 22px;font-family:'Oswald',sans-serif;width:85px;text-align:center;height:22px;background-color:"+this.color+";font-size:11px !important;color:#fff;cursor:pointer;")
        buttontwo.setAttribute("style","line-height: 22px;font-family:'Oswald',sans-serif;width:85px;text-align:center;height:22px;background-color:"+this.color+";font-size:11px !important;color:#fff;cursor:pointer;margin-left:auto;")


        var buttons = document.createElement("div")
        buttons.setAttribute("style","position: absolute;right:0; top:10px; width:175px; height:22px;display:flex;justify-content:space-between;align-items: center;flex-flow: row nowrap;")

        buttons.appendChild(buttonone)
        buttons.appendChild(buttontwo)

        varibles.appendChild(buttons)
    }

    this.buttonPublic = function(val = null){
         let buttonPrev = document.querySelector(".buttononesgt")
         let buttontNext = document.querySelector(".buttontwosgt")
         if(val == null){

            if(c == 0){
                console.log("excute 0")
                if(vselect[c + 1].value){
                    console.log('tem sim um button')
                    buttontNext.style.display = "block"
                    buttonPrev.style.display = "none"
                }else{
                    buttonPrev.style.display = "none"
                    buttontNext.style.display = "none"    
                }
            }else if ( c > 0 && c < varibles.length - 1){
                console.log("execute man 1")
                buttonPrev.style.display = "block"
            }else if (c == varibles.length - 1){
                console.log("excute man 2")
                buttontNext.style.display = "none"
            }

         }else{

             if(c > val){
                 if(vselect[val].value){
                     buttontNext.style.display = "block"
                 }
             }else if (c == val){

                 if(vselect[c == varibles.length ? c - 1 : val].value == ""){
                     console.log("UPPER NOT")
                     buttontNext.style.display = "none"
                 }
                 

                 if(vselect[c >= varibles.length - 1 ? c - 2 : val + 1].value){
                    console.log("UPPER YES")
                    buttonPrev.style.display = "block"
                    buttontNext.style.display = "block"
                    if(c == varibles.length - 1){
                        console.log("UPPER COUNT")
                        buttontNext.style.display = "none"
                    }
                }
             }
         }
    }


    this.prevPreview = function(){
        this.buttonone = document.querySelector(".buttononesgt")
        var varibles = this.varibles 
        var buttons = this.buttonPublic.bind(this)

        this.buttonone.addEventListener("click",function(e){
            var ele =  indexOfElement(nr.indexOf(varibles[c == 0 ? varibles.length - 1 : c - 1]))
            
            if(ele == "" || ele == null || typeof ele == undefined){
                alert("escolha a seleção",ele)
                return
            }
            reset()
            buttons(c - 1)
            --c
            if(c < 0){
               c = varibles.length - 1
            }
            buttons()
            console.log(c)
            varibles[c].style.display = "block"
        })
    }

    this.nextPreview = function(){
        this.buttontwo = document.querySelector(".buttontwosgt")
        var varibles = this.varibles
        var buttons = this.buttonPublic.bind(this)
        this.buttontwo.addEventListener("click",function(e){
            var ele = indexOfElement(nr.indexOf(varibles[c]))
            
            if(ele == "" || ele == null || typeof ele == undefined){
                alert("escola a seleção")
                return
            }
            reset()
            buttons(c)
            ++c
            if(c == varibles.length){
                c = 0
            }
            buttons(c)
            varibles[c].style.display = "block"
        })
    }


    this.startObject = function(){
        reset()
        style()
        console.log(varibles.length)

        var buttons = this.buttonPublic.bind(this)
        buttons()
        this.elementForeach(function(e){
            console.log(e)
            varibles[e].addEventListener('change',function(e){
                console.log(e.target.value)
                if(!e.target.value){
                    return
                }
                reset()
                console.log(e,"este daqui")
                console.log(c,"antes")
                c++
                buttons(c)
                if(c == varibles.length ){
                    return
                }

                buttons()

                console.log(c,"depois")
                varibles[c].style.display = "block"
                console.log(c,"dipois do display block")
            })
        })
    }

    this.resetSelect = function(){
        let buttonPrev = document.querySelector(".buttononesgt")
        let buttontNext = document.querySelector(".buttontwosgt")

        var resetselect = this.resetselect
        var buttons = this.buttonPublic.bind(this)
        resetselect.addEventListener('click',function(e){
            reset()
            c = 0
            varibles[c].style.display = "block"
            buttons()
            buttonPrev.style.display = "none"
            buttontNext.style.display = "none"
        })
    }

    this.elementForeach(function(e){
        console.log(vselect[e].value,e)
    })

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