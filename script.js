const state = {
  isFilteredPage: false,
};

const userNameInput = document.querySelector('#idUserNameInput');
const userTweetInput = document.querySelector('#idUserTweetInput');
const tweetButton = document.querySelector('#idTweetButton');
const randomButton = document.querySelector('#idRandomButton');
const goBackButton = document.querySelector('#idGoBackButton');
// 이름 , 내용, 버튼 불러오기

const mainTweetList = document.querySelector('#tweetlist');

function loadDATA() {
  const ul = document.createElement('ul');
  ul.id = 'tweetWrapper';

  const tweets = DATA.reduce(tweetListReducer, ul);

  state.isFilteredPage = false;
  mainTweetList.append(tweets);
}

function loadfilteredDATA(targetName) {
  const ul = document.createElement('ul');
  ul.id = 'tweetWrapper';

  const tweets = DATA.filter(function (tweet) {
    return tweet.user === targetName;
  }).reduce(tweetListReducer, ul);

  state.isFilteredPage = true;
  mainTweetList.append(tweets);
}

function tweetListReducer(ul, tweet, id) {
  const li = document.createElement('li');
  li.classList.add('white');

  const user = document.createElement('span');
  const createdAt = document.createElement('div');
  const message = document.createElement('div');

  user.id = `user${id}`;
  user.classList.add('classUserNameTweet');
  user.textContent = tweet.user;
  user.addEventListener('click', addOnClickHere);

  const h5 = document.createElement('h5');
  createdAt.id = `createdAt${id}`;
  createdAt.classList.add('classCreatedAtTweet');
  h5.textContent = tweet.created_at;
  createdAt.append(h5);

  message.id = `message${id}`;
  message.classList.add('classMessageTweet');
  message.textContent = tweet.message;

  li.append(user, createdAt, message);
  ul.append(li);
  return ul;
}

function removeTweet() {
  const tweetWrapper = document.querySelector('#tweetWrapper');
  tweetWrapper.remove();
} // 모든 Tweet을 삭제 (id로 조회하여 .remove()로 삭제)

function addOnClickHere(event) {
  let targetName = event.target.textContent;
  alert(`${targetName} 필터링 결과입니다.`);
  removeTweet();
  loadfilteredDATA(targetName);
} // 특정 아이디만 EventListener 추가

tweetButton.onclick = function () {
  if (state.isFilteredPage) {
    alert('Go Back 버튼을 눌러 전체 트윗 창으로 돌아가세요.');
    return;
  }
  let tweetObject = {};
  let currentTime = new Date().format();
  if (userNameInput.value && userTweetInput.value) {
    tweetObject.user = userNameInput.value;
    tweetObject.message = userTweetInput.value;
    tweetObject.created_at = currentTime;
    alert(`${tweetObject.user}님의 트윗을 전송합니다.`);
    DATA.unshift(tweetObject);
    removeTweet();
    loadDATA();
    userNameInput.value = '';
    userTweetInput.value = '';
  } else {
    alert('User와 Message를 모두 입력하세요.');
  }
}; // tweetButton 작동 부분

randomButton.onclick = function () {
  if (state.isFilteredPage) {
    alert('Go Back 버튼을 눌러 전체 트윗 창으로 돌아가세요.');
    return;
  }
  let tweetObject = {};
  tweetObject = generateNewTweet();
  DATA.unshift(tweetObject);
  removeTweet();
  loadDATA();
}; // randomButton 작동 부분

goBackButton.onclick = function () {
  alert('전체 트윗 창입니다.');
  removeTweet();
  loadDATA();
}; // goBackButton 작동 부분

loadDATA();
