require('normalize.css/normalize.css');
require('styles/App.scss');



import React from 'react';
import ReactDOM from 'react-dom'; //15版本以后需要import

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

/********************************获取区间内随机值函数 **************************************/
function getRangeRandom(low,high){
  return Math.ceil((Math.random() * (high - low) + low));
}

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

    var styleObj = {};
    //如果props属性中指定了这张图片位置，则使用这个位置信息
    if (this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    return(
      <figure className = 'img-figure' style = {styleMedia}>
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
/*****************************************主组件start******************************************/

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    //常量Constant存储页面布局的可取值范围
    this.Constant = { //中心图片
         centerPos:{
           left: 0,
           right: 0
         },
         hPosRange:{ //图片在水平方向上取值范围
           leftSecX: [0, 0],
           rightSecX: [0, 0],
           y: [0, 0]
         },
         vPosRange:{ //图片在垂直方向的取值范围
           x: [0, 0],
           topY: [0, 0]
         }
       };
    //初始化图片状态
    this.state = {
       imgsArrangeArr:[
         /*{
           pos: {
             left:'0',
             top:'0'
           }
         }*/
       ]
   };
  }

 
 
  //重新布局所有图片，centerIndex指定居中排布的图片
  rearrange(centerIndex){
   var imgsArrangeArr = this.state.imgsArrangeArr,
       Constant = this.Constant,
       centerPos = Constant.centerPos,
       hPosRange = Constant.hPosRange,
       vPosRange = Constant.vPosRange,
       hPosRangeLeftSecX = hPosRange.leftSecX,
       hPosRangeRightSecX = hPosRange.rightSecX,
       hPosRangeY = hPosRange.y,
       vPosRangeTopY = vPosRange.topY,
       vPosRangeX = vPosRange.x,

       imgsArrangeTopArr = [], //用来存储上侧图片的状态信息，取0或1张图片放在上侧
       topImgNum = Math.ceil(Math.random() * 2),
       topImgSpliceIndex = 0,
       imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1); //剔除并返回中心图片状态信息

       //centerIndex居中,只有一张
       imgsArrangeCenterArr[0].pos = centerPos;

       //取出要布局上侧图片的状态信息
       topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
       imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

       //布局位于上侧的图片
       imgsArrangeTopArr.forEach((value,index)=>{
         imgsArrangeTopArr[index] = {
           pos:{
            top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
            left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
           }
          }
       });

       //布局左右两侧的状态信息
       for(var i = 0, j = imgsArrangeArr.length, k = j/ 2; i < j; i++){
         var hPosRangeLORX = null;

         //一半布局左边，一半布局右边
         if(i < k){
           hPosRangeLORX = hPosRangeLeftSecX;
         }
         else {
           hPosRangeLORX = hPosRangeRightSecX;
         }
         imgsArrangeArr[i] = {
           pos:{
            top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
            left:getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
           }
         }
       }
       if (imgsArrangeTopArr && imgsArrangeTopArr[0]){
         imgsArrangeArr.splice(topImgSpliceIndex, 0,imgsArrangeTopArr[0]);
       }

       imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

       this.setState({
         imgsArrangeArr : imgsArrangeArr
       });

  }



  //组件加载以后，为每个图片计算位置范围,通过ref属性锁定子组件
  componentDidMount() {
    //首先获得舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
    //获取imgFigure的大小,这里直接ImgFigure0，因为图片是一样大的
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);
    //计算Constant的值-中心图片位置点的取值范围
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    //计算Constant的值-左侧和右侧位置点的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算Constant的值-上侧位置点的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

   //调用函数，指定第一张居中
    this.rearrange(0);
  }

  render() {
    //控制组件和图片数组
    var controllerUnits = [],imgFigures = [];
    //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
    /*imageDatas.forEach(function(value){
      imgFigures.push(<ImgFigure data = {value}/>);
    });*/
    imageDatas.forEach((value,index)=>{

      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
            pos:{
              left: 0,
              top: 0
            }
        }
      }

    imgFigures.push(<ImgFigure data = {value} key = {index} ref = {'imgFigure' + index} arrange = {this.state.imgsArrangeArr[index]}/>);
    });

    return (
      <section className = "stage" ref = "stage">
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
/*******************************************end********************************************/

AppComponent.defaultProps = {
};

export default AppComponent;
