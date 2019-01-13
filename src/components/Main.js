require('normalize.css/normalize.css');
require('styles/App.css');



import React from 'react';

//获取图片的json路径
var imageDatas = require('../data/imageDatas.json');

//let yeomanImage = require('../images/yeoman.png');

//获取图片url,写函数遍历所有图片,也可以用自执行函数
function getImageURL(imageDatasArr){
  for (var i = 0;i<imageDatasArr.length; i++){
    var singleImageData = imageDatasArr[i]; //获取单个图片
    singleImageData.imageURL = require('../images/' + singleImageData.filename); //单个图片的url
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
}

//调用函数
imageDatas = getImageURL(imageDatas);

/* 注释默认代码
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
      <img src={yeomanImage} alt="yeomanImage Generator" />
      <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}
*/
//页面布局
class AppComponent extends React.Component {
  render() {
    return (
      <section className = "index">
        <section className = 'image-sec'>
        </section>
        <nav className = 'controller-nav'>
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
