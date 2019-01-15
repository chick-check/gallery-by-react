require('normalize.css/normalize.css');
require('styles/App.scss');



import React from 'react';

//获取图片的json路径
let imageDatas = require('../data/imageDatas.json');

//let yeomanImage = require('../images/yeoman.png');

/*****************************************图片url start******************************************/
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

/*****************************************图片url end******************************************/

//单个图片的展示（图片以及图片下的文字）
/*
var ImgFigure = React.createClass({
  render: function(){
    return(
      <figure>
        <img src = {this.props.data.imageURL} alt = {this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>

    );
  }
})
*/
/*****************************************单个图片样式处理start******************************************/
//ES6 class 定义组件
class ImgFigure extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <figure className = 'img-figure'>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className = 'img-title'>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
/*****************************************单个图片样式处理end******************************************/

/*注释默认代码
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
/*****************************************页面布局start******************************************/
class AppComponent extends React.Component {
  render() {
    //控制组件和图片数组
    var controllerUnits = [],imgFigures = [];
    //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
    /*imageDatas.forEach(function(value){
      imgFigures.push(<ImgFigure data = {value}/>);
    });*/
    imageDatas.forEach((value,index)=>{
      imgFigures.push(<ImgFigure data = {value} key = {index}/>);
    });
    return (
      <section className = "stage">
        <section className = 'image-sec'>
         {imgFigures}
        </section>
        <nav className = 'controller-nav'>
         {controllerUnits}
        </nav>
      </section>
    );
  }
}
/*****************************************页面布局end******************************************/

AppComponent.defaultProps = {
};

export default AppComponent;
