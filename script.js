const story = {

    start:{

        type:"action",

        title:"Hello there.",

        text:"I made something instead of trying to awkwardly say this in person.",

        choices:[
            {
                label:"Oh...? now i'm curious",
                next:"whyWebsite"
            }
        ]

    },


        whyWebsite:{

        type:"action",

        title:"Why a website among everything else?",

        text:`We're Computer Science students.

        This is one of the few things I'm actually qualified to make.

        Also...

        Talking?

        Terrifying.

        Coding?

        Weirdly easier.`,

        choices:[
            {
                label:"Fair Enough",
                next:"aboutMe"
            },

            {
                label:"That actually makes sense",
                next:"aboutMe"
            }

        ]

    },

    aboutMe:{

        type:"action",

        title:"A little about me",

        text:`We've never really talked properly.

        We shared OOAD.

        Then somehow another course brought us back into the same orbit.

        University can be funny like that.

        Thousands of students.

        Hundreds of classrooms.

        And somehow...

        ...our paths crossed again. `,

        choices:[
            {
                label:"Go on",
                next:"hereGoesNothing"
            },

            {
                label:"I'm listening",
                next:"hereGoesNothing"
            }

        ]

    },

    hereGoesNothing:{

        type:"action",

        title:"Welp, here goes nothing :')",

        text:`I've wanted to say hello for quite a while.

        Every time I thought,

        "Today's the day."

        ...

        It never was.

        Apparently building an entire website was easier than saying "Hi."`,

        choices:[
            {
                label:"Ok...?",
                next:"oneMoreThing"
            },

            {
                label:"I'm way too invested now, go for it",
                next:"oneMoreThing"
            }

        ]

    },

    oneMoreThing:{

        type:"action",

        title:"Before I ask...",

        text:`I didn't make this expecting anything.

        I just didn't want to spend years wondering...

        "What if I'd just said hello?"`,

        choices:[
            {
                label:"Okay...",
                next:"coffee"
            },
            {
                label:"Go ahead.",
                next:"coffee"
            }
        ]

    },


    coffee:{

        type:"action",

        title:`So...`,

        text:`Would you like to grab a coffee sometime and get to know each other a little better?
        No pressure either way.`,

        choices:[
            {
                label:"I'd like that",
                next:"coffeeYes"
            },

            {
                label:"I'm gonna have to pass",
                next:"coffeeNo"
            }

        ]

    },

    coffeeYes:{

        type:"action",

        title:`Status : Accepted`,

        text:`Well... I'm glad you said yes.

        You already have my ID, so whenever you're comfortable,
        just let me know when and where.

        I'll make sure I make the time.`,

        choices:[
            {
                label:"I'd be happy to get to know you",
                next:"thanks"
            }
        ]

    },

    coffeeNo:{

        type:"action",

        title:`Status : Totally Fine`,

        text:`That's completely okay.

        Really, no hard feelings.

        I'm still glad you took the time to go through all of this.

        And hey, we're still classmates.
        No awkwardness required.`,

        choices:[
            {
                label:"Glad we cleared that up",
                next:"thanks"
            }
        ]

    },

    thanks:{

        type:"action",

        title:"Thank you",

        text:`

        Honestly...

        Thanks for taking the time to go through all of this.

        There's no rush to reply.

        No pressure, no awkward expectations.

        I just didn't want to spend years wondering
        what would've happened if I'd never said hello.

        So...

        I'm glad I finally did.
        
        `,

        choices:[]
    }

};

const progressBar=document.getElementById("progressBar");

const diagram = document.getElementById("diagram");

const footer = document.getElementById("footer_text");

let currentNode = "start";

const completedNodes = new Set();

const decisions = {};


function renderNode(nodeName){

    const totalNodes=7;

    const progress=(completedNodes.size/totalNodes)*100;

    progressBar.style.width=progress+"%";

    const node = story[nodeName];

    if (!node) {
    console.error(`Node "${nodeName}" doesn't exist.`);
    return;
    }

    let html = "";

        if(nodeName === "start"){

            html += `

                <div class="start-node"></div>

                <div class="line"></div>

            `;

        }
        else{
            
            html += createLine();

        }

        html += `

        <div class="card">

            <h2>${node.title}</h2>

            <p>${node.text}</p>

    `;


   if(node.choices){

    node.choices.forEach(choice => {

    html += `

        <button onclick="selectChoice(this); appendNode('${choice.next}','${nodeName}')">

            ${choice.label}

        </button>

    `;

    });

    }

    html += "</div>";

    diagram.innerHTML += html;

}



renderNode(currentNode);

completedNodes.add("start");

function appendNode(nodeName, fromNode = null){

    if(completedNodes.has(nodeName)){
        return;
    }

    if(fromNode){
        decisions[fromNode] = nodeName;
    }

    completedNodes.add(nodeName);

    currentNode = nodeName;

    console.log(decisions);

    renderNode(nodeName);

    if(nodeName === "thanks"){

    footer.style.display = "block";

    }

}

function selectChoice(selectedButton){

    const buttons = selectedButton.parentElement.querySelectorAll("button");

    buttons.forEach(button=>{

        if(button===selectedButton){

            button.classList.add("selected");

        }

        else{

            button.classList.add("not-selected");

        }

        button.disabled=true;

    });

}

function createLine(){

    return `

        <div class="line"></div>

    `;

}