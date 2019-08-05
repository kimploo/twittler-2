

let userNameInput = document.querySelector("#idUserNameInput");
let userTweetInput = document.querySelector("#idUserTweetInput");
let tweetButton = document.querySelector("#idTweetButton");
let randomButton = document.querySelector("#idRandomButton");
let goBackButton = document.querySelector("#idGoBackButton");
// 이름 , 내용, 버튼 불러오기

let clickId = document.getElementsByClassName("classUserNameTweet")
// 아이디의 클래스 "classViewUser"에 대한 모든 항목을 불러오기

function loadDATA(count) {
    if (count === DATA.length) {
        return console.log("loadDATA OK")
    }       // count가 DATA.length만큼 실행되도록.. 

    let mainTweetList = document.querySelector("#tweetlist");
    let ul = document.createElement("ul"); 

    let docfrag = document.createDocumentFragment();
    let tweetContents = [DATA[count].user, DATA[count].created_at, DATA[count].message]
        tweetContents.forEach(function(e, i) {
    let li = document.createElement("li");
        if (i === 0){
            li.id = `user${count}`
            li.className = "classUserNameTweet"
        }
        if (i === 1){
            li.id = `createdAt${count}`
            li.className = "classCreatedAtTweet"
        }
        if (i === 2){
            li.id = `message${count}`
            li.className = "classMessageTweet"
        }
        li.textContent = e;
        docfrag.appendChild(li);
    });
    ul.appendChild(docfrag);
    mainTweetList.appendChild(ul);

    // DATA array의 모든 element를 불러온다.
    addOnClickHere(count)   // creatNewTweet으로 생성되는 모든 classViewUser에 addEvenListner
    return loadDATA(++count)  // recursion
} // DATA.length 만큼 실행된다. i.e. DATA[0] => 0번째 Tweet 생성

function loadfilteredDATA(count) {
    console.log(`countf : ${count}`)
    if (count === filteredDATA.length) {
        return console.log("loadfilteredDATA OK")
    }   // count가 filteredDATA.length만큼 실행되도록.. 
    let mainTweetList = document.querySelector("#tweetlist");

    let ul = document.createElement("ul"); 
    let docfrag = document.createDocumentFragment();
    let tweetContents = [filteredDATA[count].user, filteredDATA[count].created_at, filteredDATA[count].message]
        tweetContents.forEach(function(e, i) {
    let li = document.createElement("li");
        if (i === 0){
            li.id = `user${count}`
            li.className = "classUserNameTweet"
        }
        if (i === 1){
            li.id = `createdAt${count}`
            li.className = "classCreatedAtTweet"
        }
        if (i === 2){
            li.id = `message${count}`
            li.className = "classMessageTweet"
        }
        li.textContent = e;
        docfrag.appendChild(li);
    });
    ul.appendChild(docfrag);
    mainTweetList.appendChild(ul);

    // filteredDATA 의 모든 element를 불러온다.
    // 불러 올 때, HTML에도 추가가 되도록 설정을 해야된다.
    addOnClickHere(count)   // creatNewTweet으로 생성되는 모든 classViewUser에 addEvenListner
    return loadfilteredDATA(++count)
}   // filteredDATA.length 만큼 실행된다. i.e. filteredDATA[0] => 0번째 Tweet 생성

function removeTweet() {
    let a = document.getElementsByClassName("classUserNameTweet")
    let tweetLength = a.length
    for (let i=0; i < tweetLength; i++){
        document.getElementById(`user${i}`).remove();
        document.getElementById(`createdAt${i}`).remove();
        document.getElementById(`message${i}`).remove();
    }
    // $(".classWarpedTweet").remove();
}   // 모든 Tweet을 삭제 (id로 조회하여 .remove()로 삭제)

function addOnClickHere(i) {    
    // console.log(i);
    clickId[i].addEventListener('click', function () {
        let elementId = `user${i}`
        let nameValue = document.getElementById(elementId).textContent
        alert(`${nameValue} 필터링 결과입니다.`)
        DATA.forEach(function (element) {
            if (element.user === nameValue && !filteredDATA.includes(element)) {
                filteredDATA.unshift(element)
            }
        })
        removeTweet()
        loadfilteredDATA(0)
        // console.log(`elementID : ${elementId}, nameValue : ${nameValue}, filteredDATA : ${filteredDATA}`)
    });
}   // 특정 아이디만 EventListener 추가

tweetButton.onclick = function () {
    if (filteredDATA.length !== 0) {
        alert("Go Back 버튼을 눌러 전체 트윗 창으로 돌아가세요.");
        return undefined;
    }
    let tweetObject = {};
    let currentTime = new Date().format();
    if (userNameInput.value && userTweetInput.value) {
        tweetObject.user = userNameInput.value;
        tweetObject.message = userTweetInput.value;
        tweetObject.created_at = currentTime;
        alert(`${tweetObject.user}님의 트윗을 전송합니다.`);
        DATA.unshift(tweetObject)
        removeTweet()
        loadDATA(0);
        addOnClickHere(DATA.length - 1);
    } else {
        alert("User와 Message를 모두 입력하세요.");
    }
}   // tweetButton 작동 부분

randomButton.onclick = function () {
    if (filteredDATA.length !== 0) {
        alert("Go Back 버튼을 눌러 전체 트윗 창으로 돌아가세요.");
        return undefined;
    }
    let tweetObject = {};
    tweetObject = generateNewTweet();
    // 랜덤 유져, 랜덤 메세지
    // alert(`아무것도 입력하지 않으시면 자동으로 랜덤한 유져가 랜덤한 트윗을 전송합니다.`);
    DATA.unshift(tweetObject)
    removeTweet()
    loadDATA(0);
    addOnClickHere(DATA.length - 1);
}   // randomButton 작동 부분

goBackButton.onclick = function () {
    if (filteredDATA.length !== 0) {
        filteredDATA = [];
        removeTweet()
        loadDATA(0);
    } else {
        alert("전체 트윗 창입니다.");
        removeTweet()
        loadDATA(0);
    }
}   // goBackButton 작동 부분

loadDATA(0);